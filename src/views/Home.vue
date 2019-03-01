<template>
  <div class="main-container">
    <div class="logo">
      <small>1x1</small>basics
    </div>
    <div class="score" v-if="hasStarted">
      <small>Score:</small> {{score}}
    </div>

    <section class="main hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">

            <div v-if="hasDone">Fertig!</div>

            <div v-if="hasStarted" class="title has-text-grey">
              <span ref="no-0" v-bind:class="{ 'is-solution': index === 0 }">
                {{question[0]}}
              </span>
              <small class="has-text-grey-light">
                {{operator}}
              </small>
              <span ref="no-1" v-bind:class="{ 'is-solution': index === 1 }">
                {{question[1]}}
              </span>
              <small class="has-text-grey-light"> = </small>
              <span ref="no-2" v-bind:class="{ 'is-solution': index === 2 }">
                {{question[2]}}
              </span>
            </div>

            <div class="box">
              <div v-if="hasStarted" class="field">
                <div class="control">
                  <input v-model="input" v-on:keyup.enter="submit()" class="input is-large has-text-centered" type="text" placeholder="?" autofocus="">
                </div>
              </div>
              <button @click="submit()" :disabled='disableSubmit' class="button is-large" v-bind:class="btnClassObject">
                {{btnLabel}}
              </button>
              <div v-if="hasStarted">
                <small>Counter: {{counter}}</small>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <footer class="footer has-text-centered">
      <a href="https://github.com/mettbox/basics">
        Maik Mettenheimer
        <img alt="Github Logo" src="../assets/octocat.png">
      </a>
      maik@mettbox.de
    </footer>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: function () {
    return {
      hasStarted: false,
      hasDone: false,
      btnLabel: 'start',
      operator: '',
      question: [],
      index: null,
      solution: 0,
      input: '',
      score: 0,
      counter: 0,
      maxCount: 10,
      disableSubmit: false,
      isWrong: false,
      isRight: false
    }
  },
  computed: {
    btnClassObject () {
      return {
        'start': !this.hasStarted,
        'is-info': !this.hasStarted,
        'is-link': this.hasStarted && !this.isWrong,
        'is-fullwidth': this.hasStarted,
        'is-danger': this.isWrong,
        'is-success': !this.isWrong && this.isRight
      }
    }
  },
  methods: {
    createQuestion () {
      const max = 10
      const operators = ['x', '÷']
      this.operator = operators[Math.floor(Math.random() * operators.length)]
      let a = Math.floor(Math.random() * max + 1)
      let b = Math.floor(Math.random() * max + 1)
      let c = a * b

      this.question = [a, b, c]
      if (this.operator === '÷') {
        let i = this.question.pop()
        this.question.unshift(i)
      }

      this.index = Math.floor(Math.random() * this.question.length)
      this.solution = this.question[this.index]
      this.question[this.index] = '?'

      this.btnLabel = 'check'
    },
    submit () {
      if (!this.hasStarted) {
        this.createQuestion()
        this.hasStarted = true
        return
      }
      this.counter++
      if (this.counter === this.maxCount) {
        this.hasDone = true
        return
      }
      this.disableSubmit = true
      if (parseInt(this.input) === this.solution) {
        this.score++
        this.$refs['no-' + this.index].classList.add('is-right')
        this.btnLabel = 'right'
        this.isRight = true
      } else {
        if (this.score !== 0) this.score--
        this.$refs['no-' + this.index].classList.add('is-wrong')
        this.btnLabel = 'wrong'
        this.isWrong = true
      }
      this.question[this.index] = this.solution
      setTimeout(() => {
        this.input = ''
        this.createQuestion()
        this.disableSubmit = false
        this.isWrong = false
        this.isRight = false
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
</style>
