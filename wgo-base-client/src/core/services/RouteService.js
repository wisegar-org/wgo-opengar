var RouteService = /** @class */ (function () {
    function RouteService(frameworkRouter) {
        this.frameworkRouter = frameworkRouter;
    }
    RouteService.prototype.goTo = function (path, query) {
        if (this.frameworkRouter.currentRoute.value.path !== path) {
            if (query) {
                this.frameworkRouter
                    .push({ path: path, query: query })
                    .catch(function (err) { return console.log(err); });
                return;
            }
            this.frameworkRouter.push(path).catch(function (err) { return console.log(err); });
        }
        else {
            this.frameworkRouter.go(0);
        }
    };
    RouteService.prototype.goToPathName = function (name, query) {
        this.frameworkRouter.push({
            name: name,
            query: query,
            params: {},
        });
    };
    RouteService.prototype.goBack = function () {
        this.frameworkRouter.back();
    };
    RouteService.prototype.getRouteUrlPath = function () {
        this.frameworkRouter.currentRoute.value.fullPath;
    };
    RouteService.prototype.getCurrentPath = function () {
        return this.frameworkRouter.currentRoute.value.path;
    };
    return RouteService;
}());
export { RouteService };
//# sourceMappingURL=RouteService.js.map