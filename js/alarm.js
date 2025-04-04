let start = document.getElementById("start-btn")
let stop = document.getElementById("stop-btn")
let reset = document.getElementById("reset-btn")
let hours=0
let min =0
let sec =0
let milli =0
let interval =null;
window.onload = () => {
     document.getElementById("stopwatch-display").innerHTML =`${String(hours).padStart(2,'0')}:${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}:${String(milli).padStart(2,'0')}`
    

    }
start.addEventListener("click",()=>{
    if(interval) return
    interval = setInterval(()=>{
        milli++
        if(milli>=10)
        {
            milli=0
            sec++
        }
        if(sec>=60)
            {
                sec=0
                min++
            }
        if(min>=60)
        {
            min=0
            hours++
        }

        update()
    },100)
})
stop.addEventListener("click",()=>
{
    clearInterval(interval)
    interval=null
})
function update() {

     document.getElementById("stopwatch-display").innerHTML =`${String(hours).padStart(2,'0')}:${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}:${String(milli).padStart(2,'0')}`
}
reset.addEventListener("click",()=>{
    clearInterval(interval)
    interval=null
   hours=0
   min=0
   sec=0
   milli=0
   update()
})