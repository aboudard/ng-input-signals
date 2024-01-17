import { BehaviorSubject, Observable } from 'rxjs';

export function Observe<T>(observedKey: string): PropertyDecorator {
	return (target: any, key: string | symbol): void => {

		const subjects = new WeakMap<any, BehaviorSubject<T | undefined>>();

		const getSubject = (
			instance: any
		): BehaviorSubject<T | undefined> | undefined => {
			if (!subjects.has(instance)) {
				subjects.set(instance, new BehaviorSubject<T | undefined>(undefined));
			}
			return subjects.get(instance);
		};

		Object.defineProperty(target, key, {
			get(): Observable<T | undefined> | undefined {
				// `this` is the current instance of the class
				return getSubject(this);
			},
		});

		Object.defineProperty(target, observedKey, {
			get(): T | undefined {
				return getSubject(this)?.getValue();
			},
			set(instanceNewValue: T): void {
				getSubject(this)?.next(instanceNewValue);
			},
		});

	}
}