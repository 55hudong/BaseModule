/**
 * Created by coffee on 22/06/2017.
 */

describe("浏览器路由测试", function () {

    var route = new Route();

    it("路径跳转", function(){
        route.hash = "32333";
        expect(location.hash.replace("#", "")).toEqual(route.hash);
    });

    it("跳转事件订阅测试", function (done) {
        route.on("v-test", function () {
            done();
            route.off("v-test");
        });
        route.hash = "v-test";
    });
    it("跳转事件取消订阅测试", function (done) {
        route.on("v-test1", function () {
            done.fail("取消时间订阅失败")
        });
        route.off("v-test1");

        setTimeout(() => {
            done();
        }, 1000);

        route.hash = "v-test1";

    })

});