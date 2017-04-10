# Specifications

Build a social-media profile page that has the following:
---

1. A news feed that shows you what your friends have been doing recently, using the API:

- GET https://api.backand.com:443/1/objects/status

- Using the follow header:

    - AnonymousToken: 7e507e02-3eaf-401d-b3a9-a33e823d632f

2. A friend list:

- GET https://api.backand.com:443/1/objects/friends?pageSize=20&pageNumber=1

- Using the follow header:

    - AnonymousToken: 7e507e02-3eaf-401d-b3a9-a33e823d632f

3. A way to update your status:

- POST https://api.backand.com:443/1/objects/status

- Using the follow headers:

    - AnonymousToken: 7e507e02-3eaf-401d-b3a9-a33e823d632f
    - Content-Type: application/json

Using the follow body example:

````json
{
  "text": "Corpo do texto sendo criado",
  "user": "666"
}
````

4. Please check your solution into Github with a README.md 
file detailing instructions on how to get the app up and 
running.

Evaluation
---

*We recommend that you spend not more than 4 hours 
on the challenge*

### Evaluation criteria:

1. Understanding of core Javascript concepts and design patterns
2. The tools of choice to solve the problem
3. Code and component reuse/extensibility
4. Code design
5. Ability to write clear documentation
6. Error handling
7. BONUS: unit testing or automated tests
8. BONUS: build or deploy scripts

### Submission:

1. A link to the Github repository.
2. Briefly describe how you decided on the tools that you 
used and your design decisions.
