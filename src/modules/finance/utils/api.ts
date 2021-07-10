/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import GitHub from 'github-api'
import { Label } from './models'

async function getGitHubData(token: string) {
  const gh = new GitHub({
    token: token
  })

  const data: { [id: string]: unknown } = {}
  const me = gh.getUser()
  const repos = await me.listRepos()

  const issues: unknown[] = []
  for (const repo of repos.data) {
    console.log(repo.name)
    const issuesRepository = gh.getIssues(repo.owner.login, repo.name)
    await issuesRepository.listIssues(
      { state: 'closed' },
      async function (_err: string, issue: [{ [id: string]: unknown }]) {
        if (issue) {
          for (const isu of issue) {
            let isAccounted = false
            const labels: Label[] = isu.labels as Label[]
            for (const label of labels) {
              if (label.name == 'Accounted') {
                isAccounted = true
                break
              }
            }
            let last_comment = ''
            if (!isAccounted) {
              let hours = 0
              if ((isu.comments as number) > 0) {
                await issuesRepository.listIssueComments(
                  isu.number,
                  function (
                    _err: string,
                    comments: [{ [id: string]: unknown }]
                  ) {
                    for (const comment in comments) {
                      last_comment = comments[comment].body as string
                      if (last_comment.match(/\d*.?\d*h/)) {
                        hours = parseFloat(last_comment)
                      }
                    }
                  }
                )
              }

              issues.push({
                number: isu.id,
                title: isu.title,
                assignedTo: isu.assignee,
                status: isu.state,
                labels: isu.labels,
                project: repo.name,
                milestones: isu.milestone,
                hours: hours,
                last_comment: last_comment
              })
            }
          }
        }
      }
    )
  }
  data.issues = issues
  return data
}

async function getMilestones(token: string) {
  const gh = new GitHub({
    token: token
  })

  const data: { [id: string]: unknown } = {}
  const me = gh.getUser()
  const repos = await me.listRepos()

  const miles: unknown[] = []
  const miles_ids: unknown[] = []
  for (const repo of repos.data) {
    const issuesRepository = gh.getIssues(repo.owner.login, repo.name)
    await issuesRepository.listMilestones(
      {},
      function (_err: string, milestones: [{ [id: string]: unknown }]) {
        // Para mostrar las cerradas -> 'state': 'closed'
        if (milestones) {
          for (const milestone of milestones) {
            if (miles_ids.indexOf(milestone.title) < 0) {
              miles.push({
                id: milestone.id,
                title: milestone.title
              })
              miles_ids.push(milestone.title)
            }
          }
        }
      }
    )
  }
  data.milestones = miles
  return data
}

async function getLabels(token: string) {
  const gh = new GitHub({
    token: token
  })

  const data: { [id: string]: unknown } = {}
  const me = gh.getUser()
  const repos = await me.listRepos()

  const lbl: unknown[] = []
  const lbl_id: unknown[] = []
  for (const repo of repos.data) {
    const issuesRepository = gh.getIssues(repo.owner.login, repo.name)
    await issuesRepository.listLabels(
      {},
      function (_err: string, labels: [{ [id: string]: unknown }]) {
        // Para mostrar las cerradas -> 'state': 'closed'
        if (labels) {
          for (const label of labels) {
            if (lbl_id.indexOf(label.name) < 0) {
              lbl.push({
                id: label.id,
                title: label.name
              })
              lbl_id.push(label.name)
            }
          }
        }
      }
    )
  }
  data.labels = lbl
  return data
}

async function getProjects(token: string) {
  const gh = new GitHub({
    token: token
  })

  const data: { [id: string]: unknown } = {}
  const me = gh.getUser()
  const repos = await me.listRepos()

  const repos_id: unknown[] = []
  for (const repo of repos.data) {
    repos_id.push({
      id: repo.id,
      title: repo.name
    })
  }
  data.projects = repos_id
  return data
}

async function getUsers(token: string) {
  const gh = new GitHub({
    token: token
  })

  const data: { [id: string]: unknown } = {}
  const me = gh.getUser()
  const repos = await me.listRepos()

  const coll: unknown[] = []
  const coll_id: unknown[] = []
  for (const repo of repos.data) {
    const rrr = gh.getRepo(repo.owner.login, repo.name)
    await rrr.getCollaborators(function (
      _err: string,
      collaborators: [{ [id: string]: unknown }]
    ) {
      // Para mostrar las cerradas -> 'state': 'closed'
      if (collaborators) {
        for (const collaborator of collaborators) {
          if (coll_id.indexOf(collaborator.id) < 0) {
            coll.push({
              id: collaborator.id,
              title: collaborator.login
            })
            coll_id.push(collaborator.id)
          }
        }
      }
    })
  }
  data.collaborators = coll
  return data
}

export { getGitHubData, getMilestones, getLabels, getProjects, getUsers }
// module.exports.getGitHubData = getGitHubData
