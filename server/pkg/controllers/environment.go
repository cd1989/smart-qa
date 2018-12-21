package controllers

import (
	"time"

	log "github.com/sirupsen/logrus"
)

type EnvironmentController struct {
	BaseController
}

var environments = []Environment{
	{
		Name:       "devops-dev",
		Address:    "192.168.19.96:6060",
		Registry:   "test.caicloudprivatetest.com",
		CreateTime: time.Now(),
	},
	{
		Name:       "qa-30",
		Address:    "cps-30.platform-qa.io",
		Registry:   "test.caicloudprivatetest.com",
		CreateTime: time.Now(),
	},
	{
		Name:       "qa-40",
		Address:    "cps-30.platform-qa.io",
		Registry:   "test.caicloudprivatetest.com",
		CreateTime: time.Now(),
	},
}

func (c *EnvironmentController) List() {
	log.Debug("List environments")
	c.Data["json"] = environments
	c.ServeJSON()
}

func (c *EnvironmentController) Add() {
	log.Debug("Add environments")
	var environment Environment
	c.DecodeJSONReq(&environment)
	environment.CreateTime = time.Now()
	environments = append(environments, environment)
}

func (c *EnvironmentController) Delete() {
	name := c.Ctx.Input.Param(":name")
	log.WithField("name", name).Debug("Delete environments")

	var envs []Environment
	for _, e := range environments {
		if e.Name != name {
			envs = append(envs, e)
		}
	}
	environments = envs
}
