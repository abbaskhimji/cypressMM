describe('Mental Maths Tests', function () {

    beforeEach(() => {
        cy.visit('http://127.0.0.1:8080/')
        cy.get('input[type=text]').type('abbas')
        cy.get('input').contains('Login').click()
        cy.get('input').contains('Start').click()
    })

    it('get a question wrong - get same question', function () {

        cy.get('h1:nth-child(1)').then((firstQuestion) => {
                                  cy.get('[type="text"]').type(Math.floor((Math.random() * 100) + 1))
                                  cy.get('input').contains('Enter').click().then(() => {
                                                                                    cy.get('h1:nth-child(1)').then((firstQuestionAgain) => {
                                                                                                              expect(firstQuestionAgain.text()).contain(firstQuestion.text())
                                                                                                              })
                                            })
                                  })
    })

    it('get a question right - get different question', function () {

        cy.get('h1:nth-child(1)').then((firstQuestion) => {
                                    cy.get('[type="text"]').type(eval(firstQuestion.text()))
                                    cy.get('input').contains('Enter').click().then(() => {
                                                                        cy.get('h1:nth-child(1)').then((firstQuestionAgain) => {
                                                                                                    expect(firstQuestionAgain.text()).not.contain(firstQuestion.text())
                                                                                                    })
                                    })
        })
    })

    it('get a question wrong - get same question - get that right - get different question', function () {

        cy.get('h1:nth-child(1)').then((firstQuestion) => {
                                  cy.get('[type="text"]').type(Math.floor((Math.random() * 100) + 1))
                                  cy.get('[type="submit"]').click().then(() => {
                                                                    cy.get('h1:nth-child(1)').then((firstQuestionAgain) => {
                                                                                              expect(firstQuestionAgain.text()).contain(firstQuestion.text())
                                                                                              cy.get('[type="text"]').type(eval(firstQuestion.text()))
                                                                                              cy.get('input').contains('Enter').click().then(() => {
                                                                                                                                                cy.get('h1:nth-child(1)').then((firstQuestionAgain) => {
                                                                                                                                                                          expect(firstQuestionAgain.text()).not.contain(firstQuestion.text())
                                                                                                                                                                          })
                                                                                                                                                })
                                                                                              })
                                                                    })
                                  })
        })

    })