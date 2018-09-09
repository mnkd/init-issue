/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */

const getConfig = require('probot-config')

module.exports = app => {
  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    app.log(context)

    // Will look for 'init-issue-bot.yml' inside the '.github' folder
    const config = await getConfig(context, 'init-issue-bot.yml')
    context.log(config, 'Loaded config')

    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    await context.github.issues.createComment(issueComment)

    await context.github.projects.createProjectCard({
      column_id: config.projectColumnId,
      content_id: context.payload.issue.id,
      content_type: 'Issue',
      headers: {
        accept: 'application/vnd.github.inertia-preview+json'
      },
    })
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
