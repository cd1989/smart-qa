package routers

import (
	"github.com/astaxie/beego"

	"github.com/caicloud/smart-qa/server/pkg/controllers"
)

func InitRouters() {
	beego.Router("/api/ping", &controllers.HealthController{}, "get:Ping")
	beego.Router("/api/exec/:suite", &controllers.TestController{}, "post:Execute")

	beego.Router("/api/environments", &controllers.EnvironmentController{}, "get:List;post:Add")
	beego.Router("/api/environments/:name", &controllers.EnvironmentController{}, "delete:Delete")
}
