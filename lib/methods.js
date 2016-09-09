Meteor.methods({
    clear: function() {
        points.remove({});
    },

    insertPoint: function(data) {

        return points.insert({
            x2: data.x2,
            y2: data.y2,
            x1: data.x1,
            y1: data.y1,
            w: data.w,
            opacity: data.opacity,
            c: data.c,
            x: data.x,
            y: data.y,
            r: data.r
        }); // end of points.insert()
    },
});