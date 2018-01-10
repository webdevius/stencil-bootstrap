# Infinite list component

## API and usage: 


### Props

| Prop | PropType |Required? | defaultValue | Description |
|-|-|-|-|-|
| `items`  | `object[]` | yes    | `[]`    | Array of objects to iterate with template.
| `itemAs` | `string` | no   | `'item'` | Value associated with current value in template.
| `template` | `VirtualNode` | yes   | - | Template to render.
| `bindToList` | `boolean` | no | `false` | Value which sets if component renders in fixed height wrapper or with infinite height.
| `debounce` | `number` | no | `300` | Debounce time between fired `'onBottomReach'` event
| `bottomOffset` | `number` | no | `false` |  Offset in `px` from bottom of last list element.
| `addClass` | `string` | no | - | Class to add to every template.
| `addClassFirst` | `string` | no | - | Class to add to first template.
| `addClassLast` | `string` | no | - | Class to add to last template.
| `addClassEven` | `string` | no | - | Class to add to even template.
| `addClassOdd` | `string` | no | - | Class to add to odd template.
| `wrapperClass` | `string` | no | - | Class to `<div></div>` wrapper of list.


### Usage

With this setup: 
```tsx

    items = [
        {
            name: 'Jack'
        },
        {
            name: 'London'
        }
    ]

    getTemplate() {
        return (
            <div>
                [[item.name]]
            </div>
        )
    }

    <scb-list
        items={items}
        itemAs='item'
        template={getTemplate()}
        bindToList={true}
    ></scb-list>
    
```
Output will be: 
```html

    <scb-list> 
        <div>Jack</div>
        <div>London</div>
    </scb-list>

```


