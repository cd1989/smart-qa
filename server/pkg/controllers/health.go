package controllers

type HealthController struct {
	BaseController
}

func (c *HealthController) Ping() {
	c.Data["json"] = "pong"
	c.ServeJSON()
}

