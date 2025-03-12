# useImperativeHandle

1. ChildComponent 설계

```javascript
import { useImperativeHandle, Ref } from 'react'

interface ChildComponentProps {
    ...
}

export interface ChildRef {
    focus: () => void
    value: string;
    hello: () => void
}

function ChildComponent (props: ChildComponentProps, ref: Ref<ChildRef> ){
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus()
    value: 'child';
    hello: () => console.log('hello this is child')
    }))

    return (<input ref={inputRef} />)
}

import { useRef} from 'react'
import { ChildRef } from './ChildComponent'


function ParentComponent (){
    const childRef = useRef<ChildRef>(null)

    const focusChildInput = () => childRef.current?.focus()

}
```
