import { Component, Prop, PropDidChange, State, Event, EventEmitter, Element, Method } from '@stencil/core';
import { VirtualNode, ListDataItem } from './scb-list-interfaces';
import get from 'lodash/get'


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

    @Prop() addClass?: string = '';
    @Prop() addClassFirst?: string = '';
    @Prop() addClassLast?: string = '';
    @Prop() addClassEven?: string = '';
    @Prop() addClassOdd?: string = '';
    @Prop() wrapperClass: string;
    @Prop() bottomOffset?: number = 100;

    @Prop() debounce: number = 300;
    debounceStatus: boolean = false

    @Prop() bindToList: boolean = false;

    @State() itemsData: ListDataItem[] = []

    @Element() el: HTMLElement;

    @Event() onBottomReach: EventEmitter

    regex = /\[\[+(.*?) ?\]\]+/g;

    /**
     * Method to dispatch HTMLCustomEvent 
     * {@link https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events}
     * If scb-list has id, this id will be dispatched as event.detail
     * 
     * @memberof StencilComponent
     */
    @Method()
    loadMore() {
        if (!this.debounceStatus) {
            this.startDebounce()
            this.onBottomReach.emit(this.el.id && this.el.id)
        }
    }

    startDebounce(): void {
        this.debounceStatus = true;

        setTimeout(() =>
            this.debounceStatus = false
            , this.debounce)
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
        let last = document.querySelector(`#${this.el.id} .list-item-last`)

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

    /**
     * Adds custom class for every first, last, even and odd node
     * 
     * @private
     * @param {string} [base=''] 
     * @param {number} index 
     * @param {number} count 
     * @returns {string} 
     * @memberof StencilComponent
     */
    private addListClasses(base: string = '', index: number, count: number): string {
        let classString = base + ' list-item'.concat(this.addClass && ' ' + this.addClass)
        if (index == 0) {
            classString += ' list-item-first'.concat(this.addClassFirst && ' ' + this.addClassFirst)
        } if (index == count - 1) {
            classString += ' list-item-last'.concat(this.addClassLast && ' ' + this.addClassLast)
        } if (index % 2 == 0) {
            classString += ' list-item-even'.concat(this.addClassEven && ' ' + this.addClassEven)
        } if (Math.abs(index % 2) == 1) {
            classString += ' list-item-odd'.concat(this.addClassOdd && ' ' + this.addClassOdd)
        }
        return classString
    }

    /**
     * Interpolates virtual node's text content and attributes
     * 
     * @private
     * @param {VirtualNode} vnode 
     * @param {*} obj 
     * @returns {VirtualNode} 
     * @memberof StencilComponent
     */
    private interpolateText(vnode: VirtualNode, obj: any): VirtualNode {
        if (vnode.vtext) {

            let matches = vnode.vtext.match(this.regex)

            if (matches) {
                matches.map(matched =>

                    vnode.vtext = vnode.vtext.replace(
                        matched,
                        get(obj, matched.slice(2, -2), matched)
                    )
                )
            }
        }
        if (vnode.vattrs) {
            for (const key in vnode.vattrs) {
                if (vnode.vattrs.hasOwnProperty(key)) {

                    let matches = vnode.vattrs[key].match(this.regex)

                    if (matches)
                        matches.map(matched =>

                            vnode.vattrs[key] = vnode.vattrs[key].replace(
                                matched,
                                get(obj, matched.slice(1, -1), matched)))
                }
            }
        }
        return vnode
    }


    /**
     * Iterate current virtual node and it's children and invoke 
     * interpolation function if there's text content or attributes
     * 
     * @private
     * @param {VirtualNode} vnode 
     * @param {object} obj 
     * @returns {VirtualNode} 
     * @memberof StencilComponent
     */
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
}
