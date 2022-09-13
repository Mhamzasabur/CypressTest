let projectId = "1";
let suiteId = "1";
let testRailDomain = "https://hamzasabur.testrail.io";
Cypress.Commands.add("passTest", (testId) => {
  cy.readFile("data_files/testrun.txt").then((runid) => {
    cy.request({
      method: "POST",
      url: testRailDomain + "/index.php?/api/v2/add_results_for_cases/" + runid,
      headers: { "Content-Type": "application/json" },
      auth: {
        username: "hamza.sabur@gmail.com",
        password: "TestDemo123!",
      },
      body: {
        results: [
          {
            case_id: testId,
            status_id: 1,
          },
        ],
      },
    })
      .its("body")
      .then((body) => {
        const response = JSON.stringify(body);
      });
  });
});

Cypress.Commands.add("failTest", (testId) => {
  cy.readFile("data_files/testrun.txt").then((runid) => {
    {
      cy.request({
        method: "POST",
        url:
          testRailDomain +
          "/index.php?/api/v2/add_results_for_cases/" +
          runid +
          "",
        headers: { "Content-Type": "application/json" },
        auth: {
          username: "hamza.sabur@gmail.com",
          password: "TestDemo123!",
        },
        body: {
          results: [
            {
              case_id: testId,
              status_id: 5,
            },
          ],
        },
      })
        .its("body")
        .then((body) => {
          const response = JSON.stringify(body);
        });
    }
  });
});

Cypress.Commands.add("addRun", () => {
  //add Test Run
  //cy.task("putInCache", { key: "blah", data: "testCaseID" });
  cy.request({
    method: "POST",
    url: testRailDomain + "/index.php?/api/v2/add_run/" + projectId + "",
    headers: { "Content-Type": "application/json" },
    auth: {
      username: "hamza.sabur@gmail.com",
      password: "TestDemo123!",
    },
    body: {
      suite_id: suiteId,
      name: "Test",
    },
  })
    .its("body")
    .then((body) => {
      const runid = body.id.toString();
      cy.writeFile("data_files/testrun.txt", runid);
    });
});

Cypress.Commands.add("closeRun", () => {
  if (Cypress.browser.isHeadless) {
    if (Cypress.env("baseUrlold") === "/") {
      cy.readFile("data_files/testrun.txt").then((runid) => {
        cy.request({
          method: "POST",
          url:
            "" +
            Cypress.env("tesrailUrl") +
            "/index.php?/api/v2/close_run/" +
            runid +
            "",
          headers: { "Content-Type": "application/json" },
          auth: {
            username: "" + Cypress.env("email") + "",
            password: "" + Cypress.env("testrailKey") + "",
          },
        })
          .its("body")
          .then((body) => {
            const response = JSON.stringify(body);
          });
      });
    }
  }
});
Cypress.Commands.add("addTestCase", (sectionName, testCaseName, testCaseID) => {
  function getSections() {
    cy.request({
      method: "GET",
      url:
        testRailDomain +
        "/index.php?/api/v2/get_sections/" +
        projectId +
        "&suite_id=" +
        suiteId +
        "",
      headers: { "Content-Type": "application/json" },
      auth: {
        username: "hamza.sabur@gmail.com",
        password: "TestDemo123!",
      },
    })
      .its("body")
      .then((body) => {
        const response = JSON.stringify(body);
        cy.log(response, "Sections");
        var b = body.sections;
        cy.log(b);

        function getCases() {
          if (b.some((bb) => bb.name === sectionName)) {
            var index1 = b.findIndex((x) => x.name === sectionName);
            var sectionID = body.sections[index1].id;
            var getSectionname = sectionName;
            cy.log(getSectionname, sectionID);

            cy.request({
              method: "GET",
              url:
                testRailDomain +
                "/index.php?/api/v2/get_cases/" +
                projectId +
                "&suite_id=" +
                suiteId +
                "&section_id=" +
                sectionID +
                "",
              headers: { "Content-Type": "application/json" },
              auth: {
                username: "hamza.sabur@gmail.com",
                password: "TestDemo123!",
              },
            })
              .its("body")
              .then((body) => {
                const response = JSON.stringify(body);
                cy.log(response, "Cases");
                var a = body.cases;
                cy.log(a);

                //console.log("loginUI");
                if (a.some((aa) => aa.title === testCaseName)) {
                  cy.log(response);
                  var index = a.findIndex((x) => x.title === testCaseName);

                  testCaseID = body.cases[index].id;
                  cy.log(testCaseName, testCaseID);
                  cy.task("putInCache", { key: "testID", data: testCaseID });
                } else {
                  cy.log(a);
                  cy.request({
                    method: "POST",
                    url:
                      testRailDomain +
                      "/index.php?/api/v2/add_case/" +
                      sectionID,
                    headers: { "Content-Type": "application/json" },
                    auth: {
                      username: "hamza.sabur@gmail.com",
                      password: "TestDemo123!",
                    },
                    body: {
                      title: testCaseName,
                      template_id: 2,
                    },
                  });
                  return getCases();
                }
              });
          } else {
            cy.request({
              method: "POST",
              url:
                testRailDomain +
                "/index.php?/api/v2/add_section/" +
                projectId +
                "",
              headers: { "Content-Type": "application/json" },
              auth: {
                username: "hamza.sabur@gmail.com",
                password: "TestDemo123!",
              },
              body: {
                name: sectionName,
                suite_id: 1,
                description: "test",
              },
            });
            return getSections();
          }
        }
        return getCases();
      });
  }
  return getSections();
  // return testCaseID JXwEIdYSIQ8U41wLPZ5A
});

Cypress.Commands.add("deleteSections", () => {
  function getSections() {
    cy.request({
      method: "GET",
      url:
        testRailDomain +
        "/index.php?/api/v2/get_sections/" +
        projectId +
        "&suite_id=" +
        suiteId +
        "",
      headers: { "Content-Type": "application/json" },
      auth: {
        username: "hamza.sabur@gmail.com",
        password: "TestDemo123!",
      },
    })
      .its("body")
      .then((body) => {
        const response = JSON.stringify(body);
        cy.log(response, "Sections");
        var b = body;
        function getCases() {
          if (b.some((bb) => bb.name === "Activity Log")) {
            var index1 = b.findIndex((x) => x.name === "Activity Log");
            var sectionID = body[index1].id;
            var getSectionname = "Activity Log";
            cy.log(getSectionname, sectionID);

            cy.request({
              method: "POST",
              url:
                testRailDomain +
                "/index.php?/api/v2/delete_section/" +
                sectionID +
                "",
              headers: { "Content-Type": "application/json" },
              auth: {
                username: "hamza.sabur@gmail.com",
                password: "TestDemo123!",
              },
            })
              .its("body")
              .then((body) => {
                const response = JSON.stringify(body);
                var a = body;
                cy.log(a);
              });
          }
        }
        return getCases();
      });
  }
  return getSections();
  // return testCaseID JXwEIdYSIQ8U41wLPZ5A
});

Cypress.Commands.add("updateRun", () => {
  //add Test Run
  cy.readFile("data_files/testrun.txt").then((runid) => {
    cy.task("getCache", "testID").then((testID) => {
      cy.log(testID);
      var ID = testID;

      cy.request({
        method: "POST",
        url: testRailDomain + "/index.php?/api/v2/update_run/" + runid,
        headers: { "Content-Type": "application/json" },
        auth: {
          username: "hamza.sabur@gmail.com",
          password: "TestDemo123!",
        },
        body: {
          case_ids: [ID],
        },
      }).its("body");
    });
  });
});

Cypress.Commands.add("getResults", () => {
  //add Test Run
  cy.readFile("data_files/testrun.txt").then((runid) => {
    cy.task("getCache", "testID").then((testID) => {
      cy.log(testID);
      var ID = testID;

      cy.request({
        method: "GET",
        url: testRailDomain + "/index.php?/api/v2/get_tests/" + runid,
        //runid + "/"+testID,
        headers: { "Content-Type": "application/json" },
        auth: {
          username: "hamza.sabur@gmail.com",
          password: "TestDemo123!",
        },
      })
        .its("body")
        .then((body) => {
          var y = body;
          var index = y.findIndex((x) => x.case_id === testID);
          var test_id = body[index].id;
          // var test_id=body.test_id
          cy.log(test_id);
          console.log(index);

          cy.task("putInCache", { key: "test_id", data: test_id });
        });
    });
  });
});

Cypress.Commands.add("addStepResult", (status, steps) => {
  //add Test{} Run
  var selectItems = {
    content: "Hari Gangadharan",
    expected: "Asif Aktar",
    actual: "Jay Thomas",
    status: status,
  };
  cy.readFile("data_files/testrun.txt").then((runid) => {
    cy.task("getCache", "test_id").then((test_id) => {
      cy.log(test_id);

      var ID = test_id;
      cy.readFile("data_files/steps01.json").then((checkJson) => {
        var t = checkJson;
        if (t.some((tt) => tt.id === "addTag")) {
          var firstIndex = t.findIndex((m) => m.id === "addTag");

          //var index1 = b.findIndex((x: any) => x.name === sectionName);
          var customStep = checkJson[firstIndex].custom_steps_separated;
        }
        cy.request({
          method: "POST",
          url: testRailDomain + "/index.php?/api/v2/add_result/" + test_id,
          headers: { "Content-Type": "application/json" },
          auth: {
            username: "hamza.sabur@gmail.com",
            password: "TestDemo123!",
          },
          body: {
            status_id: 1,

            custom_step_results: customStep,
          },
        }).its("body");
      });
    });
  });
});

Cypress.Commands.add("deleteRuns", () => {
  //add Test Run

  cy.request({
    method: "Get",
    url: testRailDomain + "/index.php?/api/v2/get_runs/" + projectId + "",
    headers: { "Content-Type": "application/json" },
    auth: {
      username: "hamza.sabur@gmail.com",
      password: "TestDemo123!",
    },
  })
    .its("body")
    .then((body) => {
      // const runid = body.id.toString();
      // cy.log(runid)
      const response = JSON.stringify(body);
      cy.log(response, "Sections");

      var runArr = body;

      var count = 0;

      for (var i = 0; i < runArr.length; i++) {
        cy.log(runArr[i].id);
        cy.log(runArr.length);
        cy.request({
          method: "POST",
          url:
            testRailDomain +
            "index.php?/api/v2/delete_run/" +
            runArr[i].id +
            "",
          headers: { "Content-Type": "application/json" },
          auth: {
            username: "hamza.sabur@gmail.com",
            password: "TestDemo123!",
          },
        })
          .its("body")
          .then((body) => {
            const response = JSON.stringify(body);
            var a = body;
            cy.log(a + "Run Deleted");
            //  cy.pause()
          });
        i++;
        count = count + 1;
        cy.log(count);
      }
    });
});
