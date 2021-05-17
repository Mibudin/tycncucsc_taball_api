// The script of the sticky navigate bar

// window.onload = function(){stickyCheckNavbar();};
$(document).ready(function(){stickyCheckNavbar();});
window.onscroll = function(){stickyCheckNavbar();};

const navbar = document.getElementById("navbar");
const space = document.getElementById("navbar-space");
const stickyNavbar = navbar.offsetTop;

function stickyCheckNavbar()
{
    if(window.pageYOffset > stickyNavbar)
    {
        navbar.classList.add("fixed-top");
        space.style.height = `${navbar.offsetHeight}px`;
        // space.style.height = "0";
    }
    else
    {
        navbar.classList.remove("fixed-top");
        space.style.height = "0";
    }
}
