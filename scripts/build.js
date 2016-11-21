const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

function createMarkup(mainBundle) {
  return ReactDOMServer.renderToStaticMarkup(
    React.DOM.html({},
      React.DOM.head({},
        React.DOM.link({ rel: 'stylesheet', href: '/shared.css' })
      ),
      React.DOM.body({},
        React.DOM.div({ id: 'app' }),
        React.DOM.script({ src: '/__build__/shared.js' }),
        React.DOM.script({ src: '/__build__/' + mainBundle + '.js' })
      )
    )
  )
}

const RootDir = path.resolve(__dirname, '..');
const SubjectsDir = path.join(RootDir, 'subjects');

const Subjects = {
  HigherOrderComponents: 'Higher Order Components',
  MiniRedux: 'Implementing Redux',
  RenderProps: 'Render Props',
  Select: 'Select'
};

const SubjectDirNames = Object.keys(Subjects);

const markup = ReactDOMServer.renderToStaticMarkup(
  React.DOM.html({},
    React.DOM.head({},
      React.DOM.link({ rel: 'stylesheet', href: '/shared.css' })
    ),
    React.DOM.body({ id: 'index' },
      React.DOM.table({ cellSpacing: 0, cellPadding: 0 },
        React.DOM.tbody({},
          SubjectDirNames.map(function (dir, index) {
            return React.DOM.tr({ key: dir, className: (index % 2) ? 'odd' : 'even' },
              React.DOM.td({ className: 'exercise-link' },
                React.DOM.a({ href: '/' + dir + '/exercise.html' }, Subjects[dir])
              )
            )
          })
        ) 
      )
    )
  )
);

fs.writeFileSync(path.join(SubjectsDir, 'index.html'), markup);

SubjectDirNames.forEach(function (dir) {
  fs.writeFileSync(path.join(SubjectsDir, dir, 'exercise.html'), createMarkup(dir + '-exercise'));
});
