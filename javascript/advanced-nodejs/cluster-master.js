// ab -c200 -t10 http://localhost:8080/ | grep "Requests per second"
// got ~300 on 12 CPUs

const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const cpus = os.cpus().length;

    console.log(`forking for ${cpus} CPUs`);
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    Object.values(cluster.workers).forEach(worker => {
        worker.send(`master welcomes worker ${worker.id}`);

        worker.on('message', msg => {
            if (msg !== 'restart') return;
            const workers = Object.values(cluster.workers);
            const restartWorker = index => {
                const worker = workers[index];
                if (!worker) return;
                worker.on('exit', () => {
                    if (!worker.exitedAfterDisconnect) return;
                    console.log(`stopped ${worker.process.pid} for restart`);
                    cluster.fork().on('listening', () => restartWorker(index + 1));
                });
                worker.disconnect();
            }
            restartWorker(0);
        });
    });

    cluster.on('exit', (worker, code) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`worker ${worker.id} crashed... starting a fresh one`);
            cluster.fork();
        }
    });
} else {
    require('./cluster-server');
}