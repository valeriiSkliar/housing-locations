import {
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import {BehaviorSubject, map, Subject, takeUntil} from "rxjs";
import {getChunkArray} from "./utils/getChunkArray";
import {PaginationContext} from "./PaginationContext";


@Directive({
  selector: '[appPagination]'
})
export class PaginationDirective <T> implements OnChanges, OnInit, OnDestroy{

    @Input() appPaginationOf: T[] | null | undefined;
    @Input() appPaginationChunkSize = 4;

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();
    private chunkArray: T[][] = [];
  constructor(
      private readonly viewContainer: ViewContainerRef,
      private readonly template: TemplateRef<PaginationContext<T>>,
  ) { }

    ngOnChanges({appPaginationOf}: SimpleChanges): void {
      if (appPaginationOf) {
          this.updateView();
      }
    }

    ngOnDestroy(): void {

    }

    ngOnInit(): void {
        this.listenCurrentIndexChange();
    }

    private updateView() {
        const isViewContainerNeedClear = !this.appPaginationOf?.length;
        if (isViewContainerNeedClear) {
            this.viewContainer.clear();

            return;
        }

        this.chunkArray = getChunkArray(this.appPaginationOf as T[], this.appPaginationChunkSize);
        this.currentIndex$.next(0);
    }

    private listenCurrentIndexChange() {
        this.currentIndex$
            .pipe(
                map((currentIndex) => this.getCurrentContext(currentIndex)),
                takeUntil(this.destroy$),
            )
            .subscribe((context: PaginationContext<T>) => {
                this.viewContainer.clear();
                this.viewContainer.createEmbeddedView(this.template, context);
            });
    }

    private getCurrentContext(currentIndex: number): PaginationContext<T> {
        return {
            $implicit: this.chunkArray?.[currentIndex],
            index: currentIndex,
            appPaginationOf: this.appPaginationOf as T[],
            pageIndexes: this.chunkArray?.map((item, index) => index),
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
            selectedIndex: (index: number) => {
                this.selectedIndex(index);
            },
        };
    }

    private next() {
        const nextIndex = this.currentIndex$.value + 1;
        const newIndex = nextIndex < this.chunkArray?.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        const newIndex = previousIndex >= 0 ? previousIndex : this.chunkArray?.length - 1;

        this.currentIndex$.next(newIndex);
    }

    private selectedIndex(index: number) {
        this.currentIndex$.next(index);
    }
}
