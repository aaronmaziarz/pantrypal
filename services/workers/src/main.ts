export interface WorkerHeartbeat {
    worker: string;
    queue: string;
}

export function getWorkerHeartbeat(): WorkerHeartbeat {
    return {
        worker: "workers",
        queue: "default"
    };
}
