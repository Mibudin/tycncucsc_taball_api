// The script of the textarea counter

const counters = document.getElementsByClassName("vdors-textarea-counter");
let textareas = [];
let counts = [];

function updateTextareaCounter(index)
{
    counts[index].innerHTML = `${textareas[index].value.length}`;
    if(textareas[index].value.length >= Number(textareas[index].maxLength))
    {
        counts[index].classList.add("text-warning");
        counts[index].classList.remove("text-success");
    }
    else
    {
        counts[index].classList.add("text-success");
        counts[index].classList.remove("text-warning");
    }
}

function addTextareaCounterEvent()
{
    for(let i = 0; i < counters.length; i++)
    {
        textareas[i].addEventListener("keyup", function(){updateTextareaCounter(i)});
    }
}

for(let i = 0; i < counters.length; i++)
{
    textareas[i] = document.getElementById(counters[i].htmlFor);
    counters[i].innerHTML = `<span class="vdors-textarea-counter-counts">${textareas[i].value.length}</span> / ${textareas[i].maxLength}`;
    counts[i] = counters[i].childNodes[0];
    updateTextareaCounter(i);
}

$(document).ready(function(){addTextareaCounterEvent()});
