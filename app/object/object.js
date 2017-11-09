import Config from '../config/config';

class VisualObject {
    constructor(config = {}) {
        this.userSet = {
            mouseOverEventEnable: true,
            clickable: true,
            active: false,
        };

        // set the default config from config
        Object.keys(Config.objectUserSets).forEach(configKey => {
            if (config[configKey] === undefined) {
                this.userSet[configKey] = Config.objectUserSets[configKey];
            } else {
                this.userSet[configKey] = config[configKey];
            }
        });
    }

    remove() {
        const objects = this.Visual.sys.objects;
        this.Visual.sys.objects = objects.filter(item => item.id !== this.id);
        this.Visual.draw();
    }

    on(type, fn) {
        this.listens = this.listens || {};
        this.listens[type] = fn;
    }

    set(type, value) {
        // line.set('disableDrag',true)
        this.userSet = this.userSet || {};
        this.userSet[type] = value;
    }

    active() {
        const currentSysObj = this.object.Visual.sys.objects.filter(obj => {
            return obj.id === this.id;
        });
        console.warn(currentSysObj)
        currentSysObj[0]['isActive'] = { data: currentSysObj[0] };
    }

    unbind(type, fn) {
        this.listens = this.listens || {};
        this.listens[type] = this.listens[type] || [];
        this.listens[type].filter(fns => fns !== fn);
    }

    emit(type, data) {
        this.listens = this.listens || {};
        if (this.listens[type]) {
            this.listens[type](data);
        }
    }
}

export default VisualObject;