import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../google-maps-api-wrapper";
import * as i2 from "./marker-manager";
export class InfoWindowManager {
    constructor(_mapsWrapper, _zone, _markerManager) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markerManager = _markerManager;
        this._infoWindows = new Map();
    }
    deleteInfoWindow(infoWindow) {
        const iWindow = this._infoWindows.get(infoWindow);
        if (iWindow == null) {
            // info window already deleted
            return Promise.resolve();
        }
        return iWindow.then((i) => {
            return this._zone.run(() => {
                i.close();
                this._infoWindows.delete(infoWindow);
            });
        });
    }
    setPosition(infoWindow) {
        return this._infoWindows.get(infoWindow).then((i) => i.setPosition({
            lat: infoWindow.latitude,
            lng: infoWindow.longitude,
        }));
    }
    setZIndex(infoWindow) {
        return this._infoWindows.get(infoWindow)
            .then((i) => i.setZIndex(infoWindow.zIndex));
    }
    open(infoWindow) {
        return this._infoWindows.get(infoWindow).then((w) => {
            if (infoWindow.hostMarker != null) {
                return this._markerManager.getNativeMarker(infoWindow.hostMarker).then((marker) => {
                    return this._mapsWrapper.getNativeMap().then((map) => w.open(map, marker));
                });
            }
            return this._mapsWrapper.getNativeMap().then((map) => w.open(map));
        });
    }
    close(infoWindow) {
        return this._infoWindows.get(infoWindow).then((w) => w.close());
    }
    setOptions(infoWindow, options) {
        return this._infoWindows.get(infoWindow).then((i) => i.setOptions(options));
    }
    addInfoWindow(infoWindow) {
        const options = {
            content: infoWindow.content,
            maxWidth: infoWindow.maxWidth,
            zIndex: infoWindow.zIndex,
            disableAutoPan: infoWindow.disableAutoPan,
        };
        if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
            options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
        }
        const infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
        this._infoWindows.set(infoWindow, infoWindowPromise);
    }
    /**
     * Creates a Google Maps event listener for the given InfoWindow as an Observable
     */
    createEventObservable(eventName, infoWindow) {
        return new Observable((observer) => {
            this._infoWindows.get(infoWindow).then((i) => {
                i.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: InfoWindowManager, deps: [{ token: i1.GoogleMapsAPIWrapper }, { token: i0.NgZone }, { token: i2.MarkerManager }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: InfoWindowManager }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: InfoWindowManager, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.GoogleMapsAPIWrapper }, { type: i0.NgZone }, { type: i2.MarkerManager }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby13aW5kb3ctbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2xpYi9zZXJ2aWNlcy9tYW5hZ2Vycy9pbmZvLXdpbmRvdy1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQzs7OztBQVM1QyxNQUFNLE9BQU8saUJBQWlCO0lBSTVCLFlBQ1ksWUFBa0MsRUFBVSxLQUFhLEVBQ3pELGNBQTZCO1FBRDdCLGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDekQsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFMakMsaUJBQVksR0FDaEIsSUFBSSxHQUFHLEVBQXNDLENBQUM7SUFJTixDQUFDO0lBRTdDLGdCQUFnQixDQUFDLFVBQXlCO1FBQ3hDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELElBQUksT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3BCLDhCQUE4QjtZQUM5QixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBYSxFQUFFLEVBQUU7WUFDcEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3pCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDVixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxVQUF5QjtRQUNu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QixDQUFJLFNBQWlCLEVBQUUsVUFBeUI7UUFDbkUsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLFFBQXFCLEVBQUUsRUFBRTtZQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFhLEVBQUUsRUFBRTtnQkFDdkQsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzhHQTVFVSxpQkFBaUI7a0hBQWpCLGlCQUFpQjs7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQWdtSW5mb1dpbmRvdyB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvaW5mby13aW5kb3cnO1xyXG5cclxuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XHJcbmltcG9ydCB7IEluZm9XaW5kb3csIEluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtdHlwZXMnO1xyXG5pbXBvcnQgeyBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnLi9tYXJrZXItbWFuYWdlcic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbmZvV2luZG93TWFuYWdlciB7XHJcbiAgcHJpdmF0ZSBfaW5mb1dpbmRvd3M6IE1hcDxBZ21JbmZvV2luZG93LCBQcm9taXNlPEluZm9XaW5kb3c+PiA9XHJcbiAgICAgIG5ldyBNYXA8QWdtSW5mb1dpbmRvdywgUHJvbWlzZTxJbmZvV2luZG93Pj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgX21hcHNXcmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgcHJpdmF0ZSBfem9uZTogTmdab25lLFxyXG4gICAgICBwcml2YXRlIF9tYXJrZXJNYW5hZ2VyOiBNYXJrZXJNYW5hZ2VyKSB7fVxyXG5cclxuICBkZWxldGVJbmZvV2luZG93KGluZm9XaW5kb3c6IEFnbUluZm9XaW5kb3cpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IGlXaW5kb3cgPSB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdyk7XHJcbiAgICBpZiAoaVdpbmRvdyA9PSBudWxsKSB7XHJcbiAgICAgIC8vIGluZm8gd2luZG93IGFscmVhZHkgZGVsZXRlZFxyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaVdpbmRvdy50aGVuKChpOiBJbmZvV2luZG93KSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgaS5jbG9zZSgpO1xyXG4gICAgICAgIHRoaXMuX2luZm9XaW5kb3dzLmRlbGV0ZShpbmZvV2luZG93KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFBvc2l0aW9uKGluZm9XaW5kb3c6IEFnbUluZm9XaW5kb3cpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbigoaTogSW5mb1dpbmRvdykgPT4gaS5zZXRQb3NpdGlvbih7XHJcbiAgICAgIGxhdDogaW5mb1dpbmRvdy5sYXRpdHVkZSxcclxuICAgICAgbG5nOiBpbmZvV2luZG93LmxvbmdpdHVkZSxcclxuICAgIH0pKTtcclxuICB9XHJcblxyXG4gIHNldFpJbmRleChpbmZvV2luZG93OiBBZ21JbmZvV2luZG93KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpXHJcbiAgICAgICAgLnRoZW4oKGk6IEluZm9XaW5kb3cpID0+IGkuc2V0WkluZGV4KGluZm9XaW5kb3cuekluZGV4KSk7XHJcbiAgfVxyXG5cclxuICBvcGVuKGluZm9XaW5kb3c6IEFnbUluZm9XaW5kb3cpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbigodykgPT4ge1xyXG4gICAgICBpZiAoaW5mb1dpbmRvdy5ob3N0TWFya2VyICE9IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2VyTWFuYWdlci5nZXROYXRpdmVNYXJrZXIoaW5mb1dpbmRvdy5ob3N0TWFya2VyKS50aGVuKChtYXJrZXIpID0+IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9tYXBzV3JhcHBlci5nZXROYXRpdmVNYXAoKS50aGVuKChtYXApID0+IHcub3BlbihtYXAsIG1hcmtlcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLl9tYXBzV3JhcHBlci5nZXROYXRpdmVNYXAoKS50aGVuKChtYXApID0+IHcub3BlbihtYXApKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoaW5mb1dpbmRvdzogQWdtSW5mb1dpbmRvdyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KS50aGVuKCh3KSA9PiB3LmNsb3NlKCkpO1xyXG4gIH1cclxuXHJcbiAgc2V0T3B0aW9ucyhpbmZvV2luZG93OiBBZ21JbmZvV2luZG93LCBvcHRpb25zOiBJbmZvV2luZG93T3B0aW9ucykge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KS50aGVuKChpOiBJbmZvV2luZG93KSA9PiBpLnNldE9wdGlvbnMob3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgYWRkSW5mb1dpbmRvdyhpbmZvV2luZG93OiBBZ21JbmZvV2luZG93KSB7XHJcbiAgICBjb25zdCBvcHRpb25zOiBJbmZvV2luZG93T3B0aW9ucyA9IHtcclxuICAgICAgY29udGVudDogaW5mb1dpbmRvdy5jb250ZW50LFxyXG4gICAgICBtYXhXaWR0aDogaW5mb1dpbmRvdy5tYXhXaWR0aCxcclxuICAgICAgekluZGV4OiBpbmZvV2luZG93LnpJbmRleCxcclxuICAgICAgZGlzYWJsZUF1dG9QYW46IGluZm9XaW5kb3cuZGlzYWJsZUF1dG9QYW4sXHJcbiAgICB9O1xyXG4gICAgaWYgKHR5cGVvZiBpbmZvV2luZG93LmxhdGl0dWRlID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgaW5mb1dpbmRvdy5sb25naXR1ZGUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIG9wdGlvbnMucG9zaXRpb24gPSB7bGF0OiBpbmZvV2luZG93LmxhdGl0dWRlLCBsbmc6IGluZm9XaW5kb3cubG9uZ2l0dWRlfTtcclxuICAgIH1cclxuICAgIGNvbnN0IGluZm9XaW5kb3dQcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXIuY3JlYXRlSW5mb1dpbmRvdyhvcHRpb25zKTtcclxuICAgIHRoaXMuX2luZm9XaW5kb3dzLnNldChpbmZvV2luZG93LCBpbmZvV2luZG93UHJvbWlzZSk7XHJcbiAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIENyZWF0ZXMgYSBHb29nbGUgTWFwcyBldmVudCBsaXN0ZW5lciBmb3IgdGhlIGdpdmVuIEluZm9XaW5kb3cgYXMgYW4gT2JzZXJ2YWJsZVxyXG4gICAgKi9cclxuICBjcmVhdGVFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcsIGluZm9XaW5kb3c6IEFnbUluZm9XaW5kb3cpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XHJcbiAgICAgIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KS50aGVuKChpOiBJbmZvV2luZG93KSA9PiB7XHJcbiAgICAgICAgaS5hZGRMaXN0ZW5lcihldmVudE5hbWUsIChlOiBUKSA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGUpKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==