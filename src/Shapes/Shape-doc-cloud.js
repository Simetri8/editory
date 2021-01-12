import _ from 'lodash';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeHelper from './ShapeHelper';
import ShapeUtil from './ShapeUtil';

/// xxx(409) /*Shape-doc-cloud*/

/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/*n.d(t, "a", function () {
    return u
}),*/
/*n.d(t, "b", function () {
    return m
});*/
/// var r = n(3)/*_.assignIn*/,  // 1 times
/// a = n.n(r)
/// i = n(0)/*React*/,  // 7 times
/// o = n.n(i)
/// s = n(1)/*Geometry*/,  // 9 times
/// l = n(9)/*ShapeBase*/,  // 1 times
/// c = n(10)/*ShapeHelper*/,  // 2 times
/// d = n(8)/*ShapeUtil*/;  // 2 times
class h extends ShapeBase {
    render() {
        var e = u(this.shape()),
        t = ShapeHelper.pathsD(e.fill),
        n = ShapeHelper.pathsD(e.strokes);
        return React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getStyleDefs(), React.createElement("path", {
            className: "transparent no-print",
            d: t,
            style: this.transparentStyle()
        }), React.createElement("path", {
            className: "real",
            d: t,
            style: this.style()
        }), React.createElement("path", {
            className: "real",
            d: n,
            style: this.styleNoFill()
        }))
    }
}
function u(e) {
    var t = e.data.p1,
    n = [{
        p1: {
            x: 80213,
            y: 91104
        },
        cp: {
            x: 79665,
            y: 87847
        },
        cp2: {
            x: 81463,
            y: 84623
        },
        p2: {
            x: 84843,
            y: 82799
        }
    },
    {
        p1: {
            x: 84843,
            y: 82799
        },
        cp: {
            x: 88224,
            y: 80976
        },
        cp2: {
            x: 92594,
            y: 80873
        },
        p2: {
            x: 96099,
            y: 82535
        }
    },
    {
        p1: {
            x: 96099,
            y: 82535
        },
        cp: {
            x: 97341,
            y: 80641
        },
        cp2: {
            x: 99613,
            y: 79334
        },
        p2: {
            x: 102230,
            y: 79008
        }
    },
    {
        p1: {
            x: 102230,
            y: 79008
        },
        cp: {
            x: 104846,
            y: 78682
        },
        cp2: {
            x: 107498,
            y: 79376
        },
        p2: {
            x: 109385,
            y: 80881
        }
    },
    {
        p1: {
            x: 109385,
            y: 80881
        },
        cp: {
            x: 110442,
            y: 79164
        },
        cp2: {
            x: 112519,
            y: 78010
        },
        p2: {
            x: 114878,
            y: 77829
        }
    },
    {
        p1: {
            x: 114878,
            y: 77829
        },
        cp: {
            x: 117238,
            y: 77648
        },
        cp2: {
            x: 119545,
            y: 78466
        },
        p2: {
            x: 120982,
            y: 79992
        }
    },
    {
        p1: {
            x: 120982,
            y: 79992
        },
        cp: {
            x: 122893,
            y: 78172
        },
        cp2: {
            x: 125933,
            y: 77405
        },
        p2: {
            x: 128788,
            y: 78024
        }
    },
    {
        p1: {
            x: 128788,
            y: 78024
        },
        cp: {
            x: 131642,
            y: 78643
        },
        cp2: {
            x: 133797,
            y: 80536
        },
        p2: {
            x: 134321,
            y: 82885
        }
    },
    {
        p1: {
            x: 134321,
            y: 82885
        },
        cp: {
            x: 136663,
            y: 83402
        },
        cp2: {
            x: 138613,
            y: 84716
        },
        p2: {
            x: 139668,
            y: 86487
        }
    },
    {
        p1: {
            x: 139668,
            y: 86487
        },
        cp: {
            x: 140724,
            y: 88259
        },
        cp2: {
            x: 140780,
            y: 90315
        },
        p2: {
            x: 139824,
            y: 92123
        }
    },
    {
        p1: {
            x: 139824,
            y: 92123
        },
        cp: {
            x: 142130,
            y: 94552
        },
        cp2: {
            x: 142669,
            y: 97788
        },
        p2: {
            x: 141241,
            y: 100624
        }
    },
    {
        p1: {
            x: 141241,
            y: 100624
        },
        cp: {
            x: 139813,
            y: 103460
        },
        cp2: {
            x: 136632,
            y: 105470
        },
        p2: {
            x: 132885,
            y: 105904
        }
    },
    {
        p1: {
            x: 132885,
            y: 105904
        },
        cp: {
            x: 132858,
            y: 108565
        },
        cp2: {
            x: 131055,
            y: 111008
        },
        p2: {
            x: 128169,
            y: 112289
        }
    },
    {
        p1: {
            x: 128169,
            y: 112289
        },
        cp: {
            x: 125284,
            y: 113571
        },
        cp2: {
            x: 121767,
            y: 113492
        },
        p2: {
            x: 118974,
            y: 112082
        }
    },
    {
        p1: {
            x: 118974,
            y: 112082
        },
        cp: {
            x: 117785,
            y: 115270
        },
        cp2: {
            x: 114437,
            y: 117616
        },
        p2: {
            x: 110376,
            y: 118106
        }
    },
    {
        p1: {
            x: 110376,
            y: 118106
        },
        cp: {
            x: 106316,
            y: 118596
        },
        cp2: {
            x: 102272,
            y: 117142
        },
        p2: {
            x: 99990,
            y: 114373
        }
    },
    {
        p1: {
            x: 99990,
            y: 114373
        },
        cp: {
            x: 97194,
            y: 115738
        },
        cp2: {
            x: 93839,
            y: 116131
        },
        p2: {
            x: 90681,
            y: 115464
        }
    },
    {
        p1: {
            x: 90681,
            y: 115464
        },
        cp: {
            x: 87523,
            y: 114797
        },
        cp2: {
            x: 84830,
            y: 113125
        },
        p2: {
            x: 83207,
            y: 110827
        }
    },
    {
        p1: {
            x: 83207,
            y: 110827
        },
        cp: {
            x: 80350,
            y: 111097
        },
        cp2: {
            x: 77587,
            y: 109899
        },
        p2: {
            x: 76290,
            y: 107826
        }
    },
    {
        p1: {
            x: 76290,
            y: 107826
        },
        cp: {
            x: 74993,
            y: 105754
        },
        cp2: {
            x: 75438,
            y: 103248
        },
        p2: {
            x: 77404,
            y: 101553
        }
    },
    {
        p1: {
            x: 77404,
            y: 101553
        },
        cp: {
            x: 74855,
            y: 100338
        },
        cp2: {
            x: 73554,
            y: 97929
        },
        p2: {
            x: 74180,
            y: 95580
        }
    },
    {
        p1: {
            x: 74180,
            y: 95580
        },
        cp: {
            x: 74806,
            y: 93232
        },
        cp2: {
            x: 77217,
            y: 91477
        },
        p2: {
            x: 80155,
            y: 91230
        }
    }],
    r = Geometry.beziersBbox(n),
    a = Geometry.rectWidth(e.data) / Geometry.rectWidth(r),
    i = Geometry.rectHeight(e.data) / Geometry.rectHeight(r),
    o = Geometry.substractPoint(t, {
        x: r.p1.x * a,
        y: r.p1.y * i
    }),
    l = n.map(e => Geometry.transformCubicBezier(e, a, i, o.x, o.y)),
    c = [{
        p1: {
            x: 77405,
            y: 101552
        },
        cp: {
            x: 78608,
            y: 102126
        },
        cp2: {
            x: 79997,
            y: 102386
        },
        p2: {
            x: 81387,
            y: 102297
        }
    },
    {
        p1: {
            x: 83208,
            y: 110827
        },
        cp: {
            x: 83805,
            y: 110770
        },
        cp2: {
            x: 84391,
            y: 110650
        },
        p2: {
            x: 84950,
            y: 110470
        }
    },
    {
        p1: {
            x: 99990,
            y: 114373
        },
        cp: {
            x: 99569,
            y: 113863
        },
        cp2: {
            x: 99217,
            y: 113317
        },
        p2: {
            x: 98940,
            y: 112746
        }
    },
    {
        p1: {
            x: 118974,
            y: 112082
        },
        cp: {
            x: 119191,
            y: 111501
        },
        cp2: {
            x: 119332,
            y: 110902
        },
        p2: {
            x: 119394,
            y: 110297
        }
    },
    {
        p1: {
            x: 132884,
            y: 105904
        },
        cp: {
            x: 132912,
            y: 103070
        },
        cp2: {
            x: 130924,
            y: 100475
        },
        p2: {
            x: 127773,
            y: 99234
        }
    },
    {
        p1: {
            x: 139824,
            y: 92123
        },
        cp: {
            x: 139313,
            y: 93088
        },
        cp2: {
            x: 138534,
            y: 93944
        },
        p2: {
            x: 137548,
            y: 94624
        }
    },
    {
        p1: {
            x: 134321,
            y: 82885
        },
        cp: {
            x: 134408,
            y: 83274
        },
        cp2: {
            x: 134448,
            y: 83670
        },
        p2: {
            x: 134441,
            y: 84066
        }
    },
    {
        p1: {
            x: 120982,
            y: 79992
        },
        cp: {
            x: 120505,
            y: 80446
        },
        cp2: {
            x: 120113,
            y: 80953
        },
        p2: {
            x: 119816,
            y: 81498
        }
    },
    {
        p1: {
            x: 109385,
            y: 80881
        },
        cp: {
            x: 109131,
            y: 81293
        },
        cp2: {
            x: 108941,
            y: 81729
        },
        p2: {
            x: 108820,
            y: 82180
        }
    },
    {
        p1: {
            x: 96099,
            y: 82535
        },
        cp: {
            x: 96840,
            y: 82887
        },
        cp2: {
            x: 97527,
            y: 83310
        },
        p2: {
            x: 98142,
            y: 83795
        }
    },
    {
        p1: {
            x: 80213,
            y: 91104
        },
        cp: {
            x: 80288,
            y: 91553
        },
        cp2: {
            x: 80407,
            y: 91997
        },
        p2: {
            x: 80569,
            y: 92430
        }
    }].map(e => Geometry.transformCubicBezier(e, a, i, o.x, o.y));
    return {
        fill: ShapeUtil.genericLinesTransformed(e.data, l),
        strokes: ShapeUtil.genericLinesTransformed(e.data, c)
    }
}
class p extends ShapeBaseC {}
var m = new class extends ShapeBaseB {
    getComponent() {
        return h
    }
    getIcon() {
        return {
            caption: "",
            component: React.createElement("svg", {
                style: {
                    width: 23,
                    height: 20,
                    position: "relative"
                },
                key: this.getType()
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M4.26,8.4 C4.15,7.6 4.52,6.8 5.21,6.35 C5.9,5.9 6.79,5.87 7.51,6.28 C7.76,5.81 8.23,5.49 8.76,5.41 C9.29,5.33 9.84,5.5 10.22,5.87 C10.44,5.45 10.86,5.16 11.34,5.12 C11.83,5.07 12.3,5.27 12.59,5.65 C12.98,5.2 13.6,5.01 14.18,5.17 C14.77,5.32 15.21,5.79 15.31,6.37 C15.79,6.5 16.19,6.82 16.41,7.26 C16.62,7.7 16.63,8.21 16.44,8.66 C16.91,9.26 17.02,10.06 16.73,10.76 C16.44,11.46 15.79,11.96 15.02,12.07 C15.02,12.73 14.65,13.33 14.06,13.65 C13.47,13.97 12.75,13.95 12.18,13.6 C11.94,14.39 11.25,14.97 10.42,15.09 C9.6,15.21 8.77,14.85 8.3,14.16 C7.73,14.5 7.05,14.6 6.4,14.43 C5.76,14.27 5.21,13.85 4.88,13.29 C4.29,13.35 3.73,13.06 3.46,12.54 C3.2,12.03 3.29,11.41 3.69,10.99 C3.17,10.69 2.9,10.09 3.03,9.51 C3.16,8.93 3.65,8.5 4.25,8.43"
            }), React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0px)",
                    transformOrigin: "50% 50%"
                },
                d: " M3.69,10.99 C3.94,11.13 4.22,11.2 4.5,11.17 M4.88,13.29 C5,13.27 5.12,13.24 5.23,13.2 M8.3,14.16 C8.22,14.04 8.15,13.9 8.09,13.76 M12.18,13.6 C12.22,13.45 12.25,13.3 12.27,13.15 M15.02,12.07 C15.03,11.37 14.62,10.72 13.98,10.42 M16.44,8.66 C16.33,8.89 16.18,9.11 15.97,9.27 M15.31,6.37 C15.33,6.47 15.34,6.56 15.34,6.66 M12.59,5.65 C12.49,5.77 12.41,5.89 12.35,6.03 M10.22,5.87 C10.17,5.97 10.13,6.08 10.11,6.19 M7.51,6.28 C7.66,6.37 7.8,6.47 7.93,6.59 M4.26,8.4 C4.28,8.51 4.3,8.62 4.34,8.73"
            }))
        }
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 80,
            shapeHeight: e.shapeHeight || 60
        }))
    }
    getType() {
        return "doc-cloud"
    }
    getSettingsComponent() {
        return p
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: u(e).fill
        }
    }
    getSnapablePoints() {
        return []
    }
    getBoundingRect(e) {
        var t = u(e);
        return Geometry.genericLinesBbox(t.fill)
    }
}

export { m as ShapeDocCloudB }

export default u