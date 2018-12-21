package controllers

import (
	"net/http"
	"os/exec"
	"strings"
	"time"

	"github.com/satori/go.uuid"
	log "github.com/sirupsen/logrus"
)

const (
	TEST_RUNNER = "/workspace/runner.sh"
)

type TestController struct {
	BaseController
}

var idCounter int64
var records []Record

func (c *TestController) Execute() {
	var request TestRequst
	c.DecodeJSONReq(&request)
	log.WithField("environment", request.Environment).WithField("suite", request.Suite).Info("Execute test")

	id := strings.Replace(uuid.NewV1().String(), "-", "", -1)
	idCounter++
	record := Record{
		ID:          id,
		Environment: request.Environment,
		Suite:       request.Suite,
		TestTime:    time.Now(),
	}

	cmd := exec.Command(TEST_RUNNER, request.Suite, id)

	out, err := cmd.CombinedOutput()
	if err != nil {
		log.WithField("environment", request.Environment).WithField("suite", request.Suite).Error("run test suite error: ", err)
		c.RenderError(http.StatusInternalServerError, err.Error())
		record.Succeed = false
		records = append(records, record)
		return
	}
	record.Succeed = true
	log.Debug(string(out))

	records = append(records, record)

	c.Data["json"] = DataResponse{Data: string(out)}
	c.ServeJSON()
}

// List test records
func (c *TestController) List() {
	environment := c.GetString("environment")
	log.WithField("environment", environment).Info("Get test records")

	if environment == "" {
		c.Data["json"] = records
		c.ServeJSON()
		return
	}

	var results []Record
	for _, r := range records {
		if r.Environment == environment {
			results = append(results, r)
		}
	}

	c.Data["json"] = results
	c.ServeJSON()
}

// Delete record
func (c *TestController) Delete() {
	id := c.Ctx.Input.Param(":id")
	log.WithField("id", id).Debug("Delete test record")

	var remains []Record
	for _, r := range records {
		if r.ID != id {
			remains = append(remains, r)
		}
	}
	records = remains
}
