package main

import (
	"os"

	"github.com/astaxie/beego"
	log "github.com/sirupsen/logrus"

	"github.com/caicloud/smart-qa/server/pkg/routers"
)

func main() {
	initLog()

	beego.SetStaticPath("/reports","reports")

	routers.InitRouters()
	beego.Run()
}

func initLog() {
	log.SetLevel(log.DebugLevel)
	log.SetFormatter(&log.TextFormatter{
		DisableColors: false,
		ForceColors:   true,
		FullTimestamp: true,
	})
	log.SetOutput(os.Stdout)
}
