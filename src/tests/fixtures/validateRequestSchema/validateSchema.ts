/*
* You are allowed to study this software for learning and local * development purposes only. Any other use without explicit permission by Mindgrep, is prohibited.
* © 2022 Mindgrep Technologies Pvt Ltd
*/
import { loadJsonSchemaForEvents } from '../../../core/jsonSchemaValidation';
import { GSCloudEvent, GSActor } from '../../../core/interfaces';
import { PlainObject } from '../../../core/common';

const sampleEvents:PlainObject = {
    "/v1/loan-application.http.post": {
      "fn": "com.biz.loan_application.create_loan_application",
      "id": "/createLoanApplication",
      "data": {
        "schema": {
          "body": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": ["name","mobile_number","dob","pan_number"],
                  "properties": {
                    "uuid": { "type": "string", "maxLength": 22, "minLength": 22 },
                    "loan_application_id": { "type": "string" },
                    "mobile_number": { "type": "string", "minLength": 10, "maxLength": 10, "pattern": "^[0-9]{10}$" },
                    "email": { "type": "string", "format": "email" },
                    "name": { "type": "string" },
                    "consent": { "type": "boolean" },
                    "dob": { "type": "string", "format": "date", "pattern": "[0-9]{4}-[0-9]{2}-[0-9]{2}" },
                    "pan_number": { "type": "string", "pattern": "[A-Z]{5}[0-9]{4}[A-Z]{1}" },
                    "permanent_address": {
                      "type": "object",
                      "required": [],
                      "properties": {
                        "address_line1": { "type": "string" },
                        "address_line2": { "type": "string" },
                        "landmark": { "type": "string" },
                        "pincode": { "type": "number"}
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/v1/loan-application/:lender_loan_application_id.http.patch": {
      "id": "/loanApplicationUpdate",
      "fn": "com.biz.loan_application.update_loan_application",
      "data": {
        "schema": {
          "body": {
            "type": "object",
            "required": ["stage"],
            "properties": {
              "stage": { "type": "string" },
              "bank_statement_availability": { "type" : ["bool", "null"] },
              "nach_details": {
                "type": "object",
                "required": [],
                "properties": {
                  "umrn": {
                    "type": "string",
                    "nullable": true
                  }
                }
              }
            }
          },
          "params": [
            {
              "name": "lender_loan_application_id",
              "in": "params",
              "required": true,
              "allow_empty_value": false,
              "schema": {
                "type": "string",
                "nullable": true
              }
            },
            {
              "name":"bank_id",
              "in":"query",
              "required":true,
              "allow_empty_value": false,
              "schema": {
                "type": "string",
                "nullable": true
              }
              
            }
          ]
        }
      }
    }
  };

loadJsonSchemaForEvents(sampleEvents);

const event = new GSCloudEvent(
   'loan-application',
   '/v1/loan-application.http.post',
   new Date(),
   'test1',
   '1.0',
   {
        body: {
            "uuid": "uuid1111uuid2222uuid33",
            "loan_application_id": "LSG1",
            "mobile_number": "9869999866",
            "email": "abc@email.com",
            "name": "Applicant1",
            "consent": true,
            "dob": "2000-01-01",
            "pan_number": "XXXXX5675X",
            "permanent_address": {
                "address_line1": "#123, First floor",
                "pincode": 99999                
            }
        },
        "path":{
          "lender_loan_application_id":"1234"
        },
        "query":{
          "bank_id":"ABC"
        }
   },
   'REST',
   <GSActor>{},
   {}
);

const topic = event.type;
const eventSpec = sampleEvents[topic];

export { topic, event, eventSpec };
