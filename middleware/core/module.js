function Module() {
    this.events = [];
    this.eventListeners = {};
}
Module.prototype.setListenere = function(event, callback)
    {
        if (this.events.indexOf(event)>=0 && typeof callback === 'function')
        {
            if (typeof this.eventListeners[event] === 'undefined')
            {
                this.eventListeners[event] = [];
            }
            if (this.eventListeners[event].indexOf(callback)>=0)
            {
                return;
            }
            this.eventListeners[event].push(callback);
        }
    };

Module.prototype.unsetListener = function(eventData)
    {
        if (typeof this.eventListeners[eventData.event] === 'undefined')
        {
            delete this.eventListeners[eventData][eventData.index];
        }
    };

Module.prototype.dispatchEvent = function(event,data)
    {
        if (typeof this.eventListeners[event] !== 'undefined')
        {
            for (var i = 0; i < this.eventListeners[event].length; i++)
            {
                this.eventListeners[event][i]({index:i, event:event}, data);
            }
        }
    };



module.exports = Module;