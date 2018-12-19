package routers

import (
	"github.com/astaxie/beego"

	"github.com/caicloud/smart-qa/server/pkg/controllers"
)

func InitRouters() {
	beego.Router("/api/ping", &controllers.HealthController{}, "get:Ping")
	beego.Router("/api/exec/:suite", &controllers.TestController{}, "post:Execute")
}
