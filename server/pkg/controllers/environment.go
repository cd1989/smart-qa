package controllers

import (
	"time"
)

type EnvironmentController struct {
	BaseController
}

var environments = []Environment{
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
}

func (c *EnvironmentController) List() {
	c.Data["json"] = environments;
	c.ServeJSON();
}

func (c *EnvironmentController) Add() {
	var environment Environment
	c.DecodeJSONReq(&environment)
	environment.CreateTime = time.Now()
	environments = append(environments, environment)
}

func (c *EnvironmentController) Delete() {
	name := c.Ctx.Input.Param(":name")
	var envs []Environment
	for _, e := range environments {
		if e.Name != name {
			envs = append(envs, e)
		}
	}
	environments = envs
}
