const swaggerJsdoc = require("swagger-jsdoc");
const { port } = require("./config");

const options = {
  swaggerDefinition: {
    swagger: "2.0",
    // 這邊會是你的api文件網頁描述
    info: {
      title: "todoList API",
      version: "1.0.0"
    },
    host: `127.0.0.1:${port}`,
    basePath: "/api",
    paths: {
      "/register": {
        post: {
          tags: ["user"],
          summary: "register",
          consumes: ["application/json"],
          parameters: [
            {
              in: "body",
              name: "body",
              description: "Put your register info here",
              required: true,
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string"
                  },
                  password: {
                    type: "string"
                  }
                }
              }
            }
          ],
          responses: {
            200: {
              description: "Register success"
            },
            409: {
              description: "Username existed",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "USERNAME_EXISTED"
                  }
                }
              }
            }
          }
        }
      },
      "/login": {
        post: {
          tags: ["user"],
          summary: "login",
          consumes: ["application/json"],
          parameters: [
            {
              in: "body",
              name: "body",
              description: "Put your login info here",
              required: true,
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string"
                  },
                  password: {
                    type: "string"
                  }
                }
              }
            }
          ],
          responses: {
            200: {
              description: "Login success"
            },
            401: {
              description: "Login fail",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "LOGIN_FAILED"
                  }
                }
              }
            }
          }
        }
      },
      "/logout": {
        get: {
          tags: ["user"],
          summary: "logout",
          responses: {
            200: {
              description: "Logout success"
            }
          }
        }
      },
      "/isLogin": {
        get: {
          tags: ["user"],
          summary: "isLogin",
          responses: {
            200: {
              description: "Logout success",
              schema: {
                type: "object",
                properties: {
                  isLogin: {
                    type: "boolean"
                  }
                }
              }
            }
          }
        }
      },
      "/tasks": {
        get: {
          tags: ["tasks"],
          summary: "Get all tasks",
          responses: {
            200: {
              description: "Logout success",
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    tid: {
                      type: "integer"
                    },
                    description: {
                      type: "string"
                    },
                    end_date: {
                      type: "string",
                      format: "date"
                    },
                    is_finish: {
                      type: "boolean"
                    }
                  }
                }
              }
            },
            403: {
              description: "No login or No permission",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "NO_PERMISSION"
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ["tasks"],
          summary: "Create new task",
          consumes: ["application/json"],
          parameters: [
            {
              in: "body",
              name: "body",
              description: "Put your task here",
              required: true,
              schema: {
                type: "object",
                properties: {
                  description: {
                    type: "string"
                  },
                  end_date: {
                    type: "string",
                    format: "date"
                  }
                }
              }
            }
          ],
          responses: {
            200: {
              description: "Create success"
            },
            403: {
              description: "No login or No permission",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "NO_PERMISSION"
                  }
                }
              }
            }
          }
        }
      },
      "/tasks/{tid}": {
        patch: {
          tags: ["tasks"],
          summary: "Update tasks",
          parameters: [
            {
              name: "tid",
              in: "path",
              description: "ID of tasks to return",
              required: true,
              type: "integer",
              format: "int64"
            },
            {
              in: "body",
              name: "body",
              description: "Is finish the task?",
              required: true,
              schema: {
                type: "object",
                properties: {
                  is_finish: {
                    type: "boolean"
                  }
                }
              }
            }
          ],
          responses: {
            200: {
              description: "Update success"
            },
            403: {
              description: "No login or No permission",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "NO_PERMISSION"
                  }
                }
              }
            },
            404: {
              description: "Update fail",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "OPERATION_FAILED"
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ["tasks"],
          summary: "Delete tasks",
          parameters: [
            {
              name: "tid",
              in: "path",
              description: "ID what want to delete",
              required: true,
              type: "integer",
              format: "int64"
            }
          ],
          responses: {
            200: {
              description: "Delete success"
            },
            403: {
              description: "No login or No permission",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "NO_PERMISSION"
                  }
                }
              }
            },
            404: {
              description: "Delete fail",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "OPERATION_FAILED"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  // 這邊會是你想要產生的api文件檔案，我是直接讓swagger去列出所有controllers
  apis: ["./controllers/*.js"]
};
module.exports = swaggerJsdoc(options);
