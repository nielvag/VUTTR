FORMAT: 1A

# VUTTR

Very Useful Tools to Remember is an simple application to manage tools and it names, links, descriptions and tags.

# Group API

## VUTTR API Root [/]

# Group Tools

## Tools [/tools]

### Create a New Tool [POST]

You may create your own tool using this action. It takes a JSON object containing a title, link, description and a collection of tags about the tool.

+ title (string) - Ttitle of the tool.
+ link (string) - Site with information about tool.
+ description (string) - Description.
+ tags (array[string]) - A collection of tags.

+ Request (application/json)

            {
              "title": "hotel",
              "link": "https://github.com/typicode/hotel",
              "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
              "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
            }

+ Response 201 (application/json)

            {
                "id": 1,
                "title": "hotel",
                "link": "https://github.com/typicode/hotel",
                "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
                "tags": [
                "node",
                "organizing",
                "webapps",
                "domain",
                "developer",
                "https",
                "proxy"
                ]
            }

+ Response 400 (application/json)

            { "error": "It seems there is an error in the request!" }

## List Tools [/tools/{?tag,per_page,page}]

+ Parameters
  + tag: node (optional, string) - Filter tools by a specific tag
  + per_page: 30 (optional, string) - Limit number of tools to retrieve.
  + page: 1 (optional, string) - The page of tools to return.

### List Tools [GET]

+ Response 200 (application/json)

            [
                {
                    id: 2,
                    title: "json-server",
                    link: "https://github.com/typicode/json-server",
                    description: "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.",
                    tags: [
                        "api",
                        "json",
                        "schema",
                        "node",
                        "github",
                        "rest"
                    ]
                },
                {
                    id: 3,
                    title: "fastify",
                    link: "https://www.fastify.io/",
                    description: "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
                    tags: [
                        "web",
                        "framework",
                        "node",
                        "http2",
                        "https",
                        "localhost"
                    ]
                }
            ]

+ Response 400 (application/json)

            { "error": "It seems there is an error in the request!" }

## Delete a Tool [/tools/{id}]

### Delete a Tool [DELETE]

Delete a tool by *id*. Anyone can delete any tool.

+ Parameters
  + id: 1 (required, number) - Id of tool to delete.

+ Response 204
