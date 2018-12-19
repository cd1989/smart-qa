package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/validation"
	log "github.com/sirupsen/logrus"

	"zer0one/clever/core/pkg/common"
	"zer0one/clever/core/pkg/filters"
	"zer0one/clever/core/pkg/models"
)

const (
	defaultPageSize = 10
	maxPageSize     = 1000
)

// BaseAPI wraps common methods for controllers to host API
type BaseController struct {
	beego.Controller
}

// GetStringFromPath gets the param from path and returns it as string
func (b *BaseController) GetStringFromPath(key string) string {
	return b.Ctx.Input.Param(key)
}

// GetInt64FromPath gets the param from path and returns it as int64
func (b *BaseController) GetInt64FromPath(key string) (int64, error) {
	value := b.Ctx.Input.Param(key)
	return strconv.ParseInt(value, 10, 64)
}

// HandleNotFound ...
func (b *BaseController) HandleNotFound(text string) {
	log.Info(text)
	b.RenderError(http.StatusNotFound, text)
}

// HandleUnauthorized ...
func (b *BaseController) HandleUnauthorized() {
	log.Info("unauthorized")
	b.RenderError(http.StatusUnauthorized, "")
}

// HandleForbidden ...
func (b *BaseController) HandleForbidden(text string) {
	log.Infof("forbidden: %s", text)
	b.RenderError(http.StatusForbidden, text)
}

// HandleBadRequest ...
func (b *BaseController) HandleBadRequest(text string) {
	log.Info(text)
	b.RenderError(http.StatusBadRequest, text)
}

// HandleStatusPreconditionFailed ...
func (b *BaseController) HandleStatusPreconditionFailed(text string) {
	log.Info(text)
	b.RenderError(http.StatusPreconditionFailed, text)
}

// HandleConflict ...
func (b *BaseController) HandleConflict(text ...string) {
	msg := ""
	if len(text) > 0 {
		msg = text[0]
	}
	log.Infof("conflict: %s", msg)

	b.RenderError(http.StatusConflict, msg)
}

// HandleInternalServerError ...
func (b *BaseController) HandleInternalServerError(text string) {
	log.Error(text)
	b.RenderError(http.StatusInternalServerError, "")
}

// Render returns nil as it won't render template
func (b *BaseController) Render() error {
	return nil
}

// RenderError provides shortcut to render http error
func (b *BaseController) RenderError(code int, text string) {
	http.Error(b.Ctx.ResponseWriter, text, code)
}

// DecodeJSONReq decodes a json request
func (b *BaseController) DecodeJSONReq(v interface{}) {
	err := json.Unmarshal(b.Ctx.Input.CopyBody(1<<32), v)
	if err != nil {
		log.Errorf("Error while decoding the json request, error: %v, %v",
			err, string(b.Ctx.Input.CopyBody(1 << 32)[:]))
		b.CustomAbort(http.StatusBadRequest, "Invalid json request")
	}
}

// Validate validates v if it implements interface validation.ValidFormer
func (b *BaseController) Validate(v interface{}) {
	validator := validation.Validation{}
	isValid, err := validator.Valid(v)
	if err != nil {
		log.Errorf("failed to validate: %v", err)
		b.CustomAbort(http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError))
	}

	if !isValid {
		message := ""
		for _, e := range validator.Errors {
			message += fmt.Sprintf("%s %s \n", e.Field, e.Message)
		}
		b.CustomAbort(http.StatusBadRequest, message)
	}
}

// DecodeJSONReqAndValidate does both decoding and validation
func (b *BaseController) DecodeJSONReqAndValidate(v interface{}) {
	b.DecodeJSONReq(v)
	b.Validate(v)
}

// Redirect does redirection to resource URI with http header status code.
func (b *BaseController) Redirect(statusCode int, resouceID string) {
	requestURI := b.Ctx.Request.RequestURI
	resourceURI := requestURI + "/" + resouceID

	b.Ctx.Redirect(statusCode, resourceURI)
}

// GetIDFromURL checks the ID in request URL
func (b *BaseController) GetIDFromURL() int64 {
	idStr := b.Ctx.Input.Param(":id")
	if len(idStr) == 0 {
		b.CustomAbort(http.StatusBadRequest, "invalid ID in URL")
	}

	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil || id <= 0 {
		b.CustomAbort(http.StatusBadRequest, "invalid ID in URL")
	}

	return id
}

// SetPaginationHeader set"Link" and "X-Total-Count" header for pagination request
func (b *BaseController) SetPaginationHeader(total, page, pageSize int64) {
	b.Ctx.ResponseWriter.Header().Set("X-Total-Count", strconv.FormatInt(total, 10))

	link := ""

	// SetPaginationHeader set previous link
	if page > 1 && (page-1)*pageSize <= total {
		u := *(b.Ctx.Request.URL)
		q := u.Query()
		q.Set("page", strconv.FormatInt(page-1, 10))
		u.RawQuery = q.Encode()
		if len(link) != 0 {
			link += ", "
		}
		link += fmt.Sprintf("<%s>; rel=\"prev\"", u.String())
	}

	// SetPaginationHeader set next link
	if pageSize*page < total {
		u := *(b.Ctx.Request.URL)
		q := u.Query()
		q.Set("page", strconv.FormatInt(page+1, 10))
		u.RawQuery = q.Encode()
		if len(link) != 0 {
			link += ", "
		}
		link += fmt.Sprintf("<%s>; rel=\"next\"", u.String())
	}

	if len(link) != 0 {
		b.Ctx.ResponseWriter.Header().Set("Link", link)
	}
}

// GetPaginationParams ...
func (b *BaseController) GetPaginationParams() (page, pageSize int64) {
	page, err := b.GetInt64("page", 1)
	if err != nil || page <= 0 {
		b.CustomAbort(http.StatusBadRequest, "invalid page")
	}

	pageSize, err = b.GetInt64("page_size", defaultPageSize)
	if err != nil || pageSize <= 0 {
		b.CustomAbort(http.StatusBadRequest, "invalid page_size")
	}

	if pageSize > maxPageSize {
		pageSize = maxPageSize
		log.Debugf("the parameter page_size %d exceeds the max %d, set it to max", pageSize, maxPageSize)
	}

	return page, pageSize
}

// GetUser gets user from the request context.
func (b *BaseController) GetUser() (*models.User, error) {
	v := b.Ctx.Request.Context().Value(common.SecurityCtxKey)
	if v == nil {
		return nil, fmt.Errorf("no '%s' key in the request context, may not logged in", common.SecurityCtxKey)
	}

	securityCtx, ok := v.(*filters.SecurityContext)
	if !ok {
		return nil, fmt.Errorf("invalid security context, %v", v)
	}

	return securityCtx.User, nil
}
