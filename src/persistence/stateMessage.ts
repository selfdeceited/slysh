type Key = 'slysh.arrived' | 'slysh.currentChore' | 'slysh.language'
export interface IStateMessage<T> {
	value: T
	key: Key
}
