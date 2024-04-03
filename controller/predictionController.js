
const { spawn } = require('child_process');
const User = require('../models/userTandW');
const moment = require('moment');
const path = require('path');


function splitOutput(output) {
    let modelMetrics = '';
    let predictionsData = '';
    let isModelMetrics = false;
    const lines = output.split('\n');
    for (const line of lines) {
        if (line.startsWith("Model for")) {
            isModelMetrics = true;
        } else if (line.startsWith("{")) {
            isModelMetrics = false;
        }
        if (isModelMetrics) {
            modelMetrics += line + '\n';
        } else {
            predictionsData += line + '\n';
        }
    }
    return [modelMetrics.trim(), predictionsData.trim()];
}

exports.predictions = async (req, res) => {
    try {
        const users = await User.find();
        let datas = users.map(u => [u.sum]);
        console.log(datas);
        const predict = JSON.stringify(datas);

        const scriptPath = path.join(__dirname, '..', 'pythonScripts', 'prediction.py');
        const python = spawn('python', [scriptPath, predict]);

        let pythonOutput = '';
        python.stdout.on('data', function (data) {
            pythonOutput += data.toString();
        });
        python.stderr.on('data', function (data) {
            console.error('Error from Python script:', data.toString());
        });
        python.on('close', (code) => {
            console.log(`Child process closed with code ${code}`);
            if (code === 0) {
                console.log("The process exited successfully");
                const [modelMetrics, predictionsData] = splitOutput(pythonOutput);
                console.log("Model Metrics:", modelMetrics);
                try {
                    const predictions = JSON.parse(predictionsData);
                    console.log("predictions", predictions);
                    console.log("users", users);
                    res.status(200).render('prediction', { users, predictions });
                } catch (error) {
                    console.error('Error parsing predictions data:', error);
                    res.status(500).json({ status: "failed" });
                }
            } else {
                console.log("Error occurred");
                res.status(500).json({ status: "failed" });
            }
        });
    } catch (err) {
        console.error('Error in predictions function:', err);
        res.status(500).json({ status: "failed" });
    }
};
