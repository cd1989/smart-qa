package controllers

import "time"

type EnvironmentController struct {
	BaseController
}

func (c *EnvironmentController) ListEnvironments() {
	c.Data["json"] = []Environment{
		{
			Name: "devops-dev",
			Address: "192.168.19.96:6060",
			Registry: "test.caicloudprivatetest.com",
			CreateTime: time.Now(),
		},
		{
			Name: "qa-30",
			Address: "cps-30.platform-qa.io",
			Registry: "test.caicloudprivatetest.com",
			CreateTime: time.Now(),
		},
		{
			Name: "qa-40",
			Address: "cps-30.platform-qa.io",
			Registry: "test.caicloudprivatetest.com",
			CreateTime: time.Now(),
		},
	};
	c.ServeJSON();
}
