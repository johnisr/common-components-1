const target = {};

/**
 * handler functions in proxies intercept attempts to access property of target
 * When a component writes `className={styles.class}`, jest redirects to this
 * mock object and the call for the property "class" will just return "class".
 * Thus the component will have the "class" className instead of the hash function
 * css module returns
 */
const handler = {
    get: function(_target, prop) {
        return prop;
    }
};

const proxy = new Proxy(target, handler);

export default proxy;