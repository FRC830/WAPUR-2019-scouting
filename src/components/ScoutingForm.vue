<template>
  <div ref="scouting-form">
    <div class="row">
      <div class="col mb-1">
          <button v-if="config.station" type="button" :class="[this.config.station == 'red' ? 'btn-danger' : 'btn-primary']" class="btn btn-primary mr-1"> Station
            <span class="badge badge-light"> {{ config.station.capitalize() + " " + config.stationNum }} </span>
          </button>
          <button v-if="config.schedule" type="button" class="btn btn-primary mr-1"> Event
            <span class="badge badge-light"> {{ config.schedule.split('.')[0] }} </span>
          </button>
          <button v-if="currentMatch" type="button" class="btn btn-primary mr-1"> Match
            <span class="badge badge-light"> {{ currentMatch.match }} </span>
          </button>
          <button v-if="currentMatch" type="button" class="btn btn-primary"> Team
            <span class="badge badge-light"> {{ currentMatch[config.station][config.stationNum - 1].replace('frc','') }} </span>
          </button>
      </div>
    </div>
  <!-- This holds the actual scouting form -->
  <div class="row">
    <div class="col-md">
    <form ref="form" @submit.prevent="formSubmit">
      <!--scout info-->
      <div class="form-group">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Scout Name     </span>
          </div>
          <input type="text" class="form-control" placeholder="e.x. Chris" name="scoutname" />
        </div>
      </div>                                                                                
     
      <!--team info-->
      <div class="form-group">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Team Name      </span>
          </div>
          <input type="text" class="form-control" placeholder="e.x. The Rats" name="teamname" />
        </div>
      </div>
 
      <div class="form-group">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Points        </span>
          </div>
          <input type="number" class="form-control" placeholder="e.x. 12" name="points" />
        </div>
      </div>
 
      <div class = "form-group">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Ranking Points </span>
          </div>
          <input type="text" class="form-control" placeholder="e.x. 12" name="ranking_points" />
        </div>
      </div>
      <div class="form-group">
                <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"># of Times Above</span>
          </div>
          <input type="text" class="form-control" placeholder="e.x. 3" name="above" />
        </div>
      </div>
      <div class="form-group">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"># of Times Below</span>
          </div>
          <input type="text" class="form-control" placeholder="e.x. 4" name="below" />
        </div>
      </div>
      <div class="form-group">
     
        <div class="form-check">
          <input class="form-check-input" id="atkzone" type="radio" name="auton" value="attack">
          <label for="atkzone" class="form-check-label">Did they enter the attack zone after auton?</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" id="midzone" type="radio" name="auton" value="midzone">
          <label for="midzone" class="form-check-label" >Did they enter the midzone after auton?</label>
        </div>
      </div>
      <!--strategy-->
      <div>
        <h4 class="text-left">Strategy</h4>
      </div>
      <div class="form-group">
        <select name="strategy" class="custom-select">
          <option value="Offensive">Offensive</option>
          <option value="Defensive">Defensive</option>
          <option value="None">No strategy Determinable</option>
        </select>
      </div>
      <div class="form-group">
        <select name="overUnder" class="custom-select">
          <option value="Over">Mostly Over</option>
          <option value="Mix">Mixture</option>
          <option value="Under">Mostly Under</option>
        </select>
      </div>
      <div class="form-group">
        <textarea name="comments"  class="form-control"  id="textarea" rows="5" cols="50"  placeholder="Other Strategy Notes"></textarea>                              
      </div>                                                
     
      <button class="btn btn-primary" type="submit" value="Submit">Submit</button>
    </form>
    </div>
  <div class="col-md">
  </div>
  </div>
</div>
 
</template>
<script>
import serializeArray from '../serialize.js'
import runAchievements from '../acheivements.js'
class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValidationError'
  }
}
export default {
  name: 'ScoutingForm',
  data () {
    return {
      config: {},
      schedule: {},
      currentMatch: null
    }
  },
  mounted () {
    this.getConfigAndSchedule()
  },
  methods: {
    setCurrentMatch () {
      this.currentMatch = this.schedule[this.config.matchNum]
    },
    async getConfigAndSchedule () {
      // Retrieve Config
      await this.axios.get('/api/file/config.json').then(res => {
        if (!res.data.schedule) {
          throw new ValidationError('Configuration File Corrupted. Try Saving Configuration Again.')
        }
        this.config = res.data
        this.$emit('message', 'success', `Successfully retrieved configuration file.`)
      }).catch(err => {
        console.log('Error:', err)
        if (err instanceof ValidationError) {
          this.$emit('message', 'error', err)
          return
        }
        this.$emit('message', 'error', err.response.data.error)
      })
 
      this.axios.get('/api/file/' + `schedules/${this.config.schedule}`.replace('/', '%2F')).then(res => {
        this.schedule = res.data
        this.setCurrentMatch()
        this.$emit('message', 'success', `Successfully retreived schedule ${this.config.schedule}.`)
      }).catch(err => {
        this.$emit('message', 'error', err.response.data.error)
      })
    },
    formSubmit (e) {
      let form = this.$refs.form
      let data = serializeArray(form)
      console.log('Form Data =>', data)
      this.save('scouting.csv', [data])
      this.config.matchNum += 1
      this.setCurrentMatch()
      this.save('config.json', this.config)
      console.log("Running acheivements...")
      runAchievements(data)
    },
    save (file, data) {
      console.log(data)
      this.axios.post(`/api/file/${file}`, data).then(res => {
        this.$emit('message', 'success', res.data.success)
      }).catch(err => {
        this.$emit('message', 'error', err.response.data.error)
      })
    }
  }
}
</script>