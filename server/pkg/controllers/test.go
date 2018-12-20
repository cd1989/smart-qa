package controllers

import (
	"os/exec"

	log "github.com/sirupsen/logrus"
	"net/http"
)

const TEST_RUNNER = "/workspace/runner.sh"

type TestController struct {
	BaseController
}

func (c *TestController) Execute() {
	var request TestRequst
	c.DecodeJSONReq(&request)
	log.WithField("environment", request.Environment).WithField("suite", request.Suite).Info("Execute test")
	cmd := exec.Command(TEST_RUNNER, request.Suite)

	out, err := cmd.CombinedOutput()
	if err != nil {
		log.WithField("environment", request.Environment).WithField("suite", request.Suite).Error("run test suite error: ", err)
		c.RenderError(http.StatusInternalServerError, err.Error())
		return
	}

	c.Data["json"] = DataResponse{Data: string(out)}
	c.ServeJSON()
}
