var seen = new Object();
var queue = new Array();

function getSolution()
{
    var solution = Array();
    var state = queue[queue.length-1];
    while (state)
    {
        solution.push(state);
        try
        {
            state = seen[String(state)];
        }
        catch(err)
        {
            return null;
        }
    }
    solution.reverse();
    return solution;
}

function test(oldstate, newstate, goal)
{
    
    var coma = newstate.indexOf(",");
    var first = newstate.slice(0,coma);
    var newA = first[0];
    var newB = newstate[coma+2];
    won = (newA == goal || newB == goal);
    if (newstate in seen)
        return;
    seen[String(newstate)] = String(oldstate);
    queue.push(newstate);
    return won;
}

function playGame(aMax, bMax, goal)
{
    var newstate = [0,0];
    if (newstate in seen)
        return;
    seen[String(newstate)] = String("");
    queue.push(newstate);
    while (true)
    {
        if(!queue)
            return null
        oldstate = queue[0];
        queue = queue.slice(1,queue.length);
        var coma = oldstate.indexOf(",");
        var first = oldstate.slice(0,coma);
        var aHas = first[0];
        var bHas = oldstate[coma + 2];
        if (test(oldstate,[aMax,bHas],goal))
            break;
        if (test(oldstate,[0,bMax],goal))
            break;
        if (test(oldstate,[aHas,bMax],goal))
            break;
        if (test(oldstate,[aHas,0],goal))
            break;
            var howmuch = Math.min(aHas, bMax-bHas)
        if (test(oldstate,[aHas-howmuch,bHas+howmuch],goal))
            break;
            var howmuch = Math.min(bHas, aMax-aHas)
        if (test(oldstate,[aHas+howmuch,bHas-howmuch],goal))
            break;
    }
    console.log("solution is ");
    console.log(getSolution().join("\n"));
}

playGame(7,11,6);
