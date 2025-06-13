import { Container } from 'inversify';

let container: Container | null = null;

export const getContainer = () => {
    if (!container) {
        throw new Error("Container is not initialized. Please call initializeContainer first.");
    }
    return container;
}

export const initializeContainer = (wires: Array<registerFunc>) => {
    const newContainer = new Container();
    wires.forEach((register) => {
        register(newContainer)
    })
    container = newContainer;
}

export type registerFunc = (container: Container) => void