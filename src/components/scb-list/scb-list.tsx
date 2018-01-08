import { Component, Prop, PropDidChange, State, Event, EventEmitter, Element, Method } from '@stencil/core';
import { VirtualNode, ListDataItem } from './scb-list-interfaces';


/**
 * An infinite list component which
 * 
 * @export
 * @class StencilComponent
 */
@Component({
    tag: 'scb-list',
    styleUrl: 'scb-list.scss'
})

export class StencilComponent {

    @Prop() items: object[];
    @Prop() itemAs: string = 'item';
    @Prop() template: VirtualNode;

    @Prop() addClass?: string;
    @Prop() addClassEven?: string;
    @Prop() addClassOdd?: string;
    @Prop() wrapperClass: string;
    @Prop() bottomOffset?: number = 20;

    @Prop() bindToList: boolean = false;

    @State() itemsData: ListDataItem[] = []

    @Element() el: HTMLElement;

    @Event() onBottomReach: EventEmitter

    //TODO: Change interpolation regex to double brackets pattern
    regExpression = new RegExp(/\[(.*?)\]/g)

    @Method()
    loadMore() {
        this.onBottomReach.emit({})
    }

    componentWillLoad() {
        this.initItemsData()

        this.bindToList ?
            this.el.addEventListener('scroll', this.listScrollHandler.bind(this))
            : document.addEventListener('scroll', this.windowScrollHandler.bind(this))
    }

    listScrollHandler() {
        if (this.el.scrollTop + this.el.clientHeight >= this.el.scrollHeight - this.bottomOffset)
            this.loadMore()
    }

    windowScrollHandler() {
        let last = document.querySelector('scb-list div:last-child')

        if (last.getBoundingClientRect().bottom - this.bottomOffset <= window.innerHeight)
            this.loadMore()
    }


    @PropDidChange('items')
    itemsdidChangeHandler() {
        this.itemsData.length = 0
        this.initItemsData()
    }

    private initItemsData() {

        this.items.map((value, index) => {
            let newItemData: ListDataItem = {
                index: index,
                itemAs: this.itemAs
            }
            newItemData[this.itemAs] = value

            this.itemsData = [...this.itemsData, newItemData]
        })
        return this.itemsData
    }

    private addListClasses(base: string = '', index: number, count: number): string {
        let classString = base + ' list-item'
        if (index == 0) {
            classString += ' list-item-first'
        } if (index == count - 1) {
            classString += ' list-item-last'
        } if (index % 2 == 0) {
            classString += ' list-item-even'
        } if (Math.abs(index % 2) == 1) {
            classString += ' list-item-odd'
        }
        return classString
    }

    //TODO: Refactor this
    private interpolateText(vnode: VirtualNode, obj: any): VirtualNode {
        if (vnode.vtext) {

            let matches = vnode.vtext.match(new RegExp(/\[(.*?)\]/g))

            if (matches)
                matches.map(matched =>

                    //TODO: replace eval statement with object key find function
                    vnode.vtext = vnode.vtext.replace(
                        matched,
                        eval('obj.' + matched.slice(1, -1))
                    )
                )
        }
        if (vnode.vattrs) {
            for (const key in vnode.vattrs) {
                if (vnode.vattrs.hasOwnProperty(key)) {
                    let matches = vnode.vattrs[key].match(new RegExp(/\[(.*?)\]/g))

                    if (matches)
                        matches.map(matched =>

                            vnode.vattrs[key] = vnode.vattrs[key].replace(
                                matched,
                                eval('obj.' + matched.slice(1, -1))
                            ))
                }
            }
        }
        return vnode
    }


    private iterateChildVNodes(vnode: VirtualNode, obj: object): VirtualNode {

        if (vnode.vtext)
            vnode = this.interpolateText(vnode, obj)

        if (vnode.vattrs)
            vnode = this.interpolateText(vnode, obj)

        if (vnode.vchildren) {

            for (var i = 0; i < vnode.vchildren.length; i++) {
                vnode.vchildren[i] = this.iterateChildVNodes(vnode.vchildren[i], obj)
            }

        }

        return vnode
    }

    render() {

        const list = this.itemsData.map(val => {

            let cloned: VirtualNode = JSON.parse(JSON.stringify(this.template)),
                interpolated = this.iterateChildVNodes(cloned, val)

            interpolated.vattrs.class = this.addListClasses(interpolated.vattrs.class, val.index, this.itemsData.length)

            return (
                interpolated
            )

        })

        return (

            <div class={"item-list-wrapper " + this.wrapperClass}>
                {list}
            </div>
        );
    }

    /**
     * Utils for performance check
     */
    private timeStart: any
    private startPerfMark() {
        this.timeStart = performance.now()
    }
    private endPerfMark() {
        let timeEnd = performance.now()
        console.log('Operations took ' + (timeEnd - this.timeStart) + 'ms.')
    }
}
