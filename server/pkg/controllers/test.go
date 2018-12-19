package controllers

import (
	"os/exec"

	log "github.com/sirupsen/logrus"
)

const TEST_RUNNER = "/workspace/runner.sh"

type TestController struct {
	BaseController
}

func (c *TestController) Execute() {
	suite := c.Ctx.Input.Param(":suite")
	log.WithField("suite", suite).Info("Execute test")
	cmd := exec.Command(TEST_RUNNER, suite)

	out, err := cmd.CombinedOutput()
	if err != nil {
		log.WithField("suite", suite).Error("run test suite error: ", err)
	}

	c.Data["json"] = DataResponse{Data: string(out)}
	c.ServeJSON()
}