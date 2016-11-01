function Module()
{
    this.events = [];
    this.eventListeners = {};

    this.setListenere = function(event, callback)
    {
        if (this.events.indexOf(event)>=0 && typeof callback === 'function')
        {
            if (typeof this.eventListeners[event] === 'undefined')
            {
                this.eventListeners[event] = [];
            }
            this.eventListeners[event].push(callback);
        }
    };

    this.dispatchEvent = function(event,data)
    {
        if (typeof this.eventListeners[event] !== 'undefined')
        {
            for (var i = 0; i < this.eventListeners[event].length; i++)
            {
                this.eventListeners[event][i]({}, data);
            }
        }
    };
}


module.exports = Module;