import { container } from 'tsyringe';

// DIにおいて、classは自動で登録されるが、値は手動で登録する必要がある
function SetDIValue<T>(key: string, value: T): void {
    container.register(key, {
        useValue: value,
    });
}

export { SetDIValue}