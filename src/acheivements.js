function runAcheivements (data) {
    console.log(data)

    // data.comments = 'robot is good'
    // if (data.comments.indexOf('lick'))
    console.log('Acheivements running...')
    // offensive/defensive: "Offensive"
    // overUnder: "Over"


    if (data.comments.indexOf('rainbow') !== -1) {
        $('body').css('background', 'linear-gradient(to bottom, red, orange, yellow, green, blue, purple, pink, purple, violet)')
    }
    if (data.comments.indexOf('reset') !== -1) {
        document.getElementsByTagName('BODY')[0].style = ""
    } 

    if (data.comments.indexOf('night') !== -1) {
        $('body').css('background', 'linear-gradient(to bottom, rgb(0.00001,0,0), rgb(0,0,0))')
    }

    // Value Achievements
    if (data.points > 3){
        alert("Achievement Get! \n You got more than three points!")        
    }

    if (data.comments.indexOf('lick') !== -1) {
        alert("Achievement Get!\n Don't Lick the Checkbox.")
    }
    if (data.comments.indexOf('win') !== -1) {
        alert("Achievement Get!\n That's the only option")
    }
    if (data.comments.indexOf('flipped over') !== -1) {
        alert('Achievement Get!\n Robot Tippin\' Season')
    }
    if (data.ranking_points.indexOf(''))
    if (data.comments.indexOf('first') !== -1) {
        alert('Achievement Get!\n FIRST: Freaking Imaginative Robots Still Trash')
    }

    if (data.comments.indexOf('Doctor') !== -1) {
        alert('Achievement Get!\n I\'m a robot, not a doctor')
    }

    if (data.comments.indexOf('DOS') !== -1) {
        alert('C:\\>DOS\nBad command or file name.\n\nC:\\>')
        $('body').css('background', 'black')
    }

    if (data.comments.indexOf('google') !== -1) {
       document.write('<img src="https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg" />')
    }
    if (data.comments.indexOf('youtube') !== -1){
        document.write('<i')
    }
    if (data.comments.indexOf('water') !== -1) {
        alert('Not a Water Game. \n Type water')
    }

    if (data.comments.indexOf('bolleyball') !== -1) {
        alert('Achievement Get! \n Is is volleyball or bollyball?')
    }

    if (data.comments.indexOf('well') !== -1 || data.comments.indexOf('play') !== -1 || data.comments.indexOf('bored') !== -1){
        alert("Achievement Get! \n \n You seem to be very bored! \n If you want to have something else to do, try one of these techniques \n \n \n \n 1. Breath in and out for ten seconds \n 2. Look at a random team member and say 'Hi!' to them \n 3. Cheer for the RatPack! ")
    }






    

    
    if (data.comments.indexOf('password') !== -1) {
        alert('Hey Ryan')
        $('textarea').css('webkit-text-security', 'disc')
    }

    if (data.comments.indexOf(';') !== -1) {
        alert('Achievement Get! \n Why would you use a greek question mark? \n Use a greek question mark that looks like a semicolon')
    }

    if (data.comments.indexOf('rick') !== -1) {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
    }

    if (data.comments.indexOf('bozo') !== -1) {
        alert("you are a bozo")
    }
    
    if (data.comments.indexOf('bluescreen') !== -1) {
        var W = screen.width;
        var H = screen.height;
        document.write("<img id='a' style='cursor: none; width: " + W + "px; height: " + H + "px' src='https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2018/04/bsod-796x448.jpg' />")
        var elem = document.getElementById("a"); 
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
          }
                                                            
    }

    if (data.comments.indexOf("jerry") !== -1 || data.comments.indexOf("Jerry") !== -1) {
        $('img:nth(0)').attr({
            'src': 'https://raw.githubusercontent.com/FRC830/2019_scouting/master/web/Jerry.gif',
            'width': screen.width + "px",
            'height': screen.height + "px" 
        })
    }
}

export default runAcheivements