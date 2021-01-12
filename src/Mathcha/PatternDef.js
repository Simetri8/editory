import React from 'react';

/// xxx(223) /*PatternDef*/

/// var r = n(0)/*React*/;  // 35 times
/// var a = n.n(r);
var PatternDef = new class {
    renderBricksPatterDef(e, t, n) {
        return React.createElement("pattern", {
            key: n,
            id: t,
            x: 0,
            y: 0,
            width: e.size,
            height: e.size,
            patternTransform: "rotate(0,0,0)",
            patternUnits: "userSpaceOnUse"
        },
        React.createElement("path", {
            d: "M0,0 L".concat(e.size, ",0"),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M".concat(e.size / 2, ",0 L").concat(e.size / 2, ",").concat(e.size / 2),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M0,".concat(e.size / 2, " L").concat(e.size, ",").concat(e.size / 2),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M0,".concat(e.size / 2, " L0,").concat(e.size),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M".concat(e.size, ",").concat(e.size / 2, " L").concat(e.size, ",").concat(e.size),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M0,".concat(e.size, " L").concat(e.size, ",").concat(e.size),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }))
    }
    renderCrossHatchPatterDef(e, t, n) {
        var r = e.size * Math.sqrt(2);
        return React.createElement("pattern", {
            key: n,
            id: t,
            x: 0,
            y: 0,
            width: r,
            height: r,
            patternTransform: "rotate(45,0,0)",
            patternUnits: "userSpaceOnUse"
        },
        React.createElement("path", {
            d: "M0,0 L0,".concat(r),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M".concat(r / 2, ",0 L").concat(r / 2, ",").concat(r),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M".concat(r, ",0 L").concat(r, ",").concat(r),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M0,0 L".concat(r, ",0"),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M0,".concat(r / 2, " L").concat(r, ",").concat(r / 2),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M0,".concat(r, " L").concat(r, ",").concat(r),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }))
    }
    renderDotsPatternDef(e, t, n) {
        return React.createElement("pattern", {
            key: n,
            id: t,
            x: 0,
            y: 0,
            width: e.size,
            height: e.size,
            patternTransform: "rotate(0,0,0)",
            patternUnits: "userSpaceOnUse"
        },
        React.createElement("circle", {
            cx: e.size / 2,
            cy: e.size / 2,
            r: e.radius,
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }))
    }
    renderGridPatternDef(e, t, n) {
        return React.createElement("pattern", {
            key: n,
            id: t,
            x: e.size / 2,
            y: e.size / 2,
            width: e.size,
            height: e.size,
            patternUnits: "userSpaceOnUse"
        },
        React.createElement("path", {
            d: "M0,0 L0,".concat(e.size),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M".concat(e.size, ",0 L").concat(e.size, ",").concat(e.size),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M0,0 L".concat(e.size, ",0"),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M0,".concat(e.size, " L").concat(e.size, ",").concat(e.size),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }))
    }
    renderHorizontalLinesPatternDef(e, t, n) {
        return React.createElement("pattern", {
            key: n,
            id: t,
            x: e.size / 2,
            y: e.size / 2,
            width: e.size,
            height: e.size,
            patternUnits: "userSpaceOnUse"
        },
        React.createElement("path", {
            d: "M0,0 L".concat(e.size, ",0"),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M0,".concat(e.size, " L").concat(e.size, ",").concat(e.size),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }))
    }
    renderNorthEastLinesPatternDef(e, t, n) {
        var r = e.size * Math.sqrt(2);
        return React.createElement("pattern", {
            key: n,
            id: t,
            x: 0,
            y: 0,
            width: r,
            height: r,
            patternTransform: "rotate(45,0,0)",
            patternUnits: "userSpaceOnUse"
        },
        React.createElement("path", {
            d: "M0,0 L0,".concat(r),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M".concat(r / 2, ",0 L").concat(r / 2, ",").concat(r),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M".concat(r, ",0 L").concat(r, ",").concat(r),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }))
    }
    renderNorthWestLinesPatternDef(e, t, n) {
        var r = e.size * Math.sqrt(2);
        return React.createElement("pattern", {
            key: n,
            id: t,
            x: 0,
            y: 0,
            width: r,
            height: r,
            patternTransform: "rotate(-45,0,0)",
            patternUnits: "userSpaceOnUse"
        },
        React.createElement("path", {
            d: "M0,0 L0,".concat(r),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M".concat(r / 2, ",0 L").concat(r / 2, ",").concat(r),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M".concat(r, ",0 L").concat(r, ",").concat(r),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }))
    }
    renderVerticalLinesPatternDef(e, t, n) {
        return React.createElement("pattern", {
            key: n,
            id: t,
            x: e.size / 2,
            y: e.size / 2,
            width: e.size,
            height: e.size,
            patternUnits: "userSpaceOnUse"
        },
        React.createElement("path", {
            d: "M0,0 L0,".concat(e.size),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }), React.createElement("path", {
            d: "M".concat(e.size, ",0 L").concat(e.size, ",").concat(e.size),
            style: {
                stroke: e.color,
                strokeWidth: e.thickness,
                fill: "none"
            }
        }))
    }
    renderPatternDefs(e, t, n) {
        switch (e.name) {
        case "VerticalLinesPattern":
            return this.renderVerticalLinesPatternDef(e, t, n);
        case "HorizontalLinesPattern":
            return this.renderHorizontalLinesPatternDef(e, t, n);
        case "GridPattern":
            return this.renderGridPatternDef(e, t, n);
        case "NorthEastLinesPattern":
            return this.renderNorthEastLinesPatternDef(e, t, n);
        case "NorthWestLinesPattern":
            return this.renderNorthWestLinesPatternDef(e, t, n);
        case "CrossHatchPattern":
            return this.renderCrossHatchPatterDef(e, t, n);
        case "BrickPattern":
            return this.renderBricksPatterDef(e, t, n);
        case "DotsPattern":
            return this.renderDotsPatternDef(e, t, n)
        }
    }
    convertTikzSetPatternDef() {
        return "\n\\tikzset{\npattern size/.store in=\\mcSize,\npattern size=5pt,\npattern thickness/.store in=\\mcThickness,\npattern thickness=0.3pt,\npattern radius/.store in=\\mcRadius,\npattern radius=1pt}"
    }
    convertTikzVerticalLinesPatternDef(e) {
        return "\n\\makeatletter" + "\n\\pgfutil@ifundefined{pgf@pattern@name@".concat(e, "}{") + "\n\\pgfdeclarepatternformonly[\\mcThickness,\\mcSize]{".concat(e, "}") + "\n{\\pgfqpoint{-\\mcThickness}{-\\mcThickness}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\n\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathmoveto{\\pgfpointorigin}\n\\pgfpathlineto{\\pgfpoint{0}{\\mcSize}}\n\\pgfusepath{stroke}\n}}\n\\makeatother"
    }
    convertTikzBricksPatternDef(e) {
        return "\n\\makeatletter" + "\n\\pgfutil@ifundefined{pgf@pattern@".concat(e, "}{") + "\n\\pgfdeclarepatternformonly[\\mcThickness,\\mcSize]{".concat(e, "}") + "\n{\\pgfpointorigin}\n{\\pgfpoint{\\mcSize+\\mcThickness}{\\mcSize+\\mcThickness}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}{\n\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathmoveto{\\pgfpointorigin}\n\\pgfpathlineto{\\pgfpoint{0pt}{0.5*\\mcSize}}\n\\pgfpathlineto{\\pgfpoint{\\mcSize}{0.5*\\mcSize}}\n\\pgfpathmoveto{\\pgfpoint{0.5*\\mcSize}{0.5*\\mcSize}}\n\\pgfpathlineto{\\pgfpoint{0.5*\\mcSize}{\\mcSize}}\n\\pgfpathmoveto{\\pgfpoint{0pt}{\\mcSize}}\n\\pgfpathlineto{\\pgfpoint{\\mcSize}{\\mcSize}}\n\\pgfusepath{stroke}}}\n\\makeatother"
    }
    convertTikzCrossHatchPatternDef(e) {
        return "\n\\makeatletter" + "\n\\pgfutil@ifundefined{pgf@pattern@name@".concat(e, "}{") + "\n\\pgfdeclarepatternformonly[\\mcThickness,\\mcSize]{".concat(e, "}") + "\n{\\pgfqpoint{0pt}{0pt}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\n\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathmoveto{\\pgfqpoint{0pt}{\\mcSize}}\n\\pgfpathlineto{\\pgfpoint{\\mcSize+\\mcThickness}{-\\mcThickness}}\n\\pgfpathmoveto{\\pgfqpoint{0pt}{0pt}}\n\\pgfpathlineto{\\pgfpoint{\\mcSize+\\mcThickness}{\\mcSize+\\mcThickness}}\n\\pgfusepath{stroke}\n}}\n\\makeatother"
    }
    convertTikzDotsPatternDef(e) {
        return "\n\\makeatletter" + "\n\\pgfutil@ifundefined{pgf@pattern@name@".concat(e, "}{") + "\n\\makeatletter" + "\n\\pgfdeclarepatternformonly[\\mcRadius,\\mcThickness,\\mcSize]{".concat(e, "}") + "\n{\\pgfpoint{-0.5*\\mcSize}{-0.5*\\mcSize}}\n{\\pgfpoint{0.5*\\mcSize}{0.5*\\mcSize}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\n\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathcircle\\pgfpointorigin{\\mcRadius}\n\\pgfusepath{stroke}\n}}\n\\makeatother"
    }
    convertTikzGridPatternDef(e) {
        return "\\makeatletter" + "\n\\pgfutil@ifundefined{pgf@pattern@name@".concat(e, "}{") + "\n\\pgfdeclarepatternformonly[\\mcThickness,\\mcSize]{".concat(e, "}") + "\n{\\pgfqpoint{-\\mcThickness}{-\\mcThickness}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathmoveto{\\pgfpointorigin}\n\\pgfpathlineto{\\pgfpoint{\\mcSize}{0}}\n\\pgfpathmoveto{\\pgfpointorigin}\n\\pgfpathlineto{\\pgfpoint{0}{\\mcSize}}\n\\pgfusepath{stroke}}}\n\\makeatother"
    }
    convertTikzHorizontalLinesPatternDef(e) {
        return "\n\\makeatletter" + "\n\\pgfutil@ifundefined{pgf@pattern@name@".concat(e, " lines}{") + "\n\\pgfdeclarepatternformonly[\\mcThickness,\\mcSize]{".concat(e, "}") + "\n{\\pgfqpoint{0pt}{0pt}}\n{\\pgfpoint{\\mcSize+\\mcThickness}{\\mcSize+\\mcThickness}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathmoveto{\\pgfpointorigin}\n\\pgfpathlineto{\\pgfpoint{\\mcSize}{0}}\n\\pgfusepath{stroke}}}\n\\makeatother"
    }
    convertTikzNorthEastLinesPatternDef(e) {
        return "\n\\makeatletter" + "\n\\pgfutil@ifundefined{pgf@pattern@name@".concat(e, "}{") + "\n\\pgfdeclarepatternformonly[\\mcThickness,\\mcSize]{".concat(e, "}") + "\n{\\pgfqpoint{0pt}{0pt}}\n{\\pgfpoint{\\mcSize+\\mcThickness}{\\mcSize+\\mcThickness}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\n\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathmoveto{\\pgfqpoint{0pt}{0pt}}\n\\pgfpathlineto{\\pgfpoint{\\mcSize+\\mcThickness}{\\mcSize+\\mcThickness}}\n\\pgfusepath{stroke}\n}}\n\\makeatother"
    }
    convertTikzNorthWestLinesPatternDef(e) {
        return "\n\\makeatletter" + "\n\\pgfutil@ifundefined{pgf@pattern@name@".concat(e, "}{") + "\n\\pgfdeclarepatternformonly[\\mcThickness,\\mcSize]{".concat(e, "}") + "\n{\\pgfqpoint{0pt}{-\\mcThickness}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\\pgfpoint{\\mcSize}{\\mcSize}}\n{\n\\pgfsetcolor{\\tikz@pattern@color}\n\\pgfsetlinewidth{\\mcThickness}\n\\pgfpathmoveto{\\pgfqpoint{0pt}{\\mcSize}}\n\\pgfpathlineto{\\pgfpoint{\\mcSize+\\mcThickness}{-\\mcThickness}}\n\\pgfusepath{stroke}\n}}\n\\makeatother"
    }
    ConvertTikzPatternDefs(e, t) {
        switch (e.name) {
        case "VerticalLinesPattern":
            return this.convertTikzVerticalLinesPatternDef(t);
        case "HorizontalLinesPattern":
            return this.convertTikzHorizontalLinesPatternDef(t);
        case "GridPattern":
            return this.convertTikzGridPatternDef(t);
        case "NorthEastLinesPattern":
            return this.convertTikzNorthEastLinesPatternDef(t);
        case "NorthWestLinesPattern":
            return this.convertTikzNorthWestLinesPatternDef(t);
        case "CrossHatchPattern":
            return this.convertTikzCrossHatchPatternDef(t);
        case "BrickPattern":
            return this.convertTikzBricksPatternDef(t);
        case "DotsPattern":
            return this.convertTikzDotsPatternDef(t)
        }
    }
}

export default PatternDef