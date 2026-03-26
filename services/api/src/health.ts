export interface HealthResponse {
    service: string;
    status: "ok";
}

export function getHealthResponse(): HealthResponse {
    return {
        service: "api",
        status: "ok"
    };
}
