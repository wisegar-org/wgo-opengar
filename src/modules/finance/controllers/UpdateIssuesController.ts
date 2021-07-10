import { OrganizationDataController } from './OrganizationDataController'
import { RepositoryController } from './RepositoryController'
import { IssueController } from './IssuesController'
import { MilestoneController } from './MilestoneController'
import { Repo, IssueGithub, UserProfile, CommentGithub } from './../utils/models'
import { LabelController } from './LabelController'
import { CollaboratorController } from './CollaboratorController'
import GitHub from 'github-api'
import { ProjectController } from './ProjectController'

export class UpdateIssuesController {
  constructor() {}

  async Update(token: string) {
    const repoController = new RepositoryController()
    const projController = new ProjectController()
    const colController = new CollaboratorController()
    const labelController = new LabelController()
    const milestoneController = new MilestoneController()
    const issueController = new IssueController()

    const orgDataController = new OrganizationDataController()
    const AccountLabel = (await orgDataController.getOrganizationData()).accountingLabel

    const gh = new GitHub({
      token: token
    })

    const data: { [id: string]: Repo } = {}
    const me = gh.getUser()
    const repos = await me.listRepos()

    for (const repo of repos.data) {
      const repoId = await repoController.updateOrInsertRepository(repo.id, repo.name)

      const repoA = gh.getRepo(repo.owner.login, repo.name)
      const projects = await repoA.listProjects()

      for (const project of projects.data) {
        const proj = await projController.updateOrInsertProject(project.id, project.name)
      }

      const issuesRepository = gh.getIssues(repo.owner.login, repo.name)
      await issuesRepository.listIssues({ state: 'closed' }, async function (_err: string, issue: [IssueGithub]) {
        if (issue) {
          for (const issueGithub of issue) {
            let isAccounted = false

            let labels_ids: string[] = []

            for (const label of issueGithub.labels) {
              if (label.name == 'Accounted' || (AccountLabel != null && label.name == AccountLabel)) {
                isAccounted = true
              } else {
                labels_ids.push(label.name)
              }
              try {
                const col = await labelController.updateOrInsertLabel(label.id, label.name)
              } catch (error) {
                console.log('label error')
                console.log(label.id)
                console.log(label.name)
              }
            }

            if (!isAccounted) {
              let hours = 0
              let last_comment = ''
              if (issueGithub.comments > 0) {
                await issuesRepository.listIssueComments(
                  issueGithub.number,
                  function (_err: string, comments: [{ [id: string]: unknown }]) {
                    last_comment = comments[comments.length - 1].body as string
                    const matches = last_comment.match(/\d*.?\d*h/)
                    if (matches?.length == 1) {
                      hours = parseFloat(last_comment)
                      if (isNaN(hours)) {
                        hours = 0
                      }
                    }
                  }
                )
              }

              let milestoneId: string | undefined = undefined
              if (issueGithub.milestone) {
                try {
                  const mil = await milestoneController.updateOrInsertMilestone(
                    issueGithub.milestone.id,
                    issueGithub.milestone.title
                  )
                  milestoneId = issueGithub.milestone.title
                } catch (error) {
                  console.log('milestone error')
                  console.log(issueGithub.milestone.id)
                  console.log(issueGithub.milestone.title)
                }
              }

              let collaboratorId = undefined

              if (issueGithub.assignee) {
                const collaborator = gh.getUser(issueGithub.assignee.login)
                await collaborator.getProfile(async function (_err: string, user: UserProfile) {
                  try {
                    const col = await colController.updateOrInsertCollaborator(
                      issueGithub.assignee.id,
                      issueGithub.assignee.login,
                      issueGithub.assignee.node_id,
                      issueGithub.assignee.type,
                      issueGithub.assignee.avatar_url,
                      issueGithub.assignee.url,
                      user.name || '',
                      user.location || '',
                      user.email || '',
                      user.bio || '',
                      true
                    )
                    collaboratorId = col.id

                    try {
                      const col = await issueController.updateOrInsertIssue(
                        issueGithub.id,
                        repo.owner.login,
                        repo.name,
                        issueGithub.title,
                        issueGithub.state,
                        hours,
                        last_comment,
                        new Date(issueGithub.created_at),
                        new Date(issueGithub.closed_at),
                        new Date(issueGithub.updated_at),
                        issueGithub.number,
                        issueGithub.description,
                        issueGithub.url,
                        collaboratorId,
                        undefined, //TODO Rikr2 Falta poner la relacion con el proyecto aqui
                        repoId.id,
                        labels_ids,
                        milestoneId
                      )
                    } catch (error) {
                      console.log('==========error==========')
                      console.log(issueGithub)
                      console.log(hours)
                      console.log(error)
                      console.log('---------------------------')
                    }
                  } catch (error) {
                    console.log('collaborator error')
                    console.log(error)
                    console.log(user)
                  }
                })
              } else if (issueGithub.assignees.length > 0) {
                // TODO: Revisar que hacer cuando no tiene asignado a nadie pero si tiene varios colaboradores
                // Por el momento nos quedamos con el primero de ellos

                const coll = issueGithub.assignees[0]
                const collaborator = gh.getUser(coll.login)
                await collaborator.getProfile(async function (_err: string, user: UserProfile) {
                  try {
                    const col = await colController.updateOrInsertCollaborator(
                      coll.id,
                      coll.login,
                      coll.node_id,
                      coll.type,
                      coll.avatar_url,
                      coll.url,
                      user.name || '',
                      user.location || '',
                      user.email || '',
                      user.bio || '',
                      true
                    )
                    collaboratorId = col.id

                    try {
                      const col = await issueController.updateOrInsertIssue(
                        issueGithub.id,
                        repo.owner.login,
                        repo.name,
                        issueGithub.title,
                        issueGithub.state,
                        hours,
                        last_comment,
                        new Date(issueGithub.created_at),
                        new Date(issueGithub.closed_at),
                        new Date(issueGithub.updated_at),
                        issueGithub.number,
                        issueGithub.description,
                        issueGithub.url,
                        collaboratorId,
                        undefined, //TODO Rikr2 Falta poner la relacion con el proyecto aqui
                        repoId.id,
                        labels_ids,
                        milestoneId
                      )
                    } catch (error) {
                      console.log('==========error==========')
                      console.log(issueGithub)
                      console.log(hours)
                      console.log(error)
                      console.log('---------------------------')
                    }
                  } catch (error) {
                    console.log('collaborator error')
                    console.log(error)
                    console.log(user)
                  }
                })
              }
            }
          }
        }
      })
    }
  }

  async SingleUpdate(token: string, issueGithub: IssueGithub, comment: CommentGithub, repo: Repo) {
    if (issueGithub.state != 'closed') {
      return
    }

    const gh = new GitHub({
      token: token
    })

    const repoController = new RepositoryController()
    const projController = new ProjectController()
    const colController = new CollaboratorController()
    const labelController = new LabelController()
    const milestoneController = new MilestoneController()
    const issueController = new IssueController()

    const orgDataController = new OrganizationDataController()
    const AccountLabel = (await orgDataController.getOrganizationData()).accountingLabel

    let isAccounted = false

    let labels_ids: string[] = []

    for (const label of issueGithub.labels) {
      if (label.name == 'Accounted' || (AccountLabel != null && AccountLabel == label.name)) {
        isAccounted = true
      } else {
        labels_ids.push(label.name)
      }
      try {
        const col = await labelController.updateOrInsertLabel(label.id, label.name)
      } catch (error) {
        console.log('label error')
        console.log(label.id)
        console.log(label.name)
      }
    }

    if (!isAccounted) {
      console.log('entre a')
      let hours = 0
      let last_comment = ''
      if (comment !== undefined) {
        console.log('entre b')
        last_comment = comment.body
        const matches = last_comment.match(/\d*.?\d*h/)
        if (matches?.length == 1) {
          console.log('entre d')
          hours = parseFloat(last_comment)
          if (isNaN(hours)) {
            console.log('entre e')
            hours = 0
          }
        }
        console.log('entre f')
      } else if (issueGithub.comments > 0) {
        console.log('entre c')
        const issuesRepository = gh.getIssues(repo.owner.login, repo.name)
        await issuesRepository.listIssueComments(
          issueGithub.number,
          function (_err: string, comments: [{ [id: string]: unknown }]) {
            console.log('entre g')
            last_comment = comments[comments.length - 1].body as string
            const matches = last_comment.match(/\d*.?\d*h/)
            if (matches?.length == 1) {
              console.log('entre h')
              hours = parseFloat(last_comment)
              if (isNaN(hours)) {
                console.log('entre i')
                hours = 0
              }
            }
            console.log('entre j')
          }
        )
        console.log('entre k')
      }

      console.log('afuera')
      console.log(last_comment)
      console.log(hours)

      let milestoneId: string | undefined = undefined
      if (issueGithub.milestone) {
        try {
          const mil = await milestoneController.updateOrInsertMilestone(
            issueGithub.milestone.id,
            issueGithub.milestone.title
          )
          milestoneId = issueGithub.milestone.title
        } catch (error) {
          console.log('milestone error')
          console.log(issueGithub.milestone.id)
          console.log(issueGithub.milestone.title)
        }
      }

      let collaboratorId = undefined

      if (issueGithub.assignee) {
        const collaborator = gh.getUser(issueGithub.assignee.login)
        await collaborator.getProfile(async function (_err: string, user: UserProfile) {
          try {
            const col = await colController.updateOrInsertCollaborator(
              issueGithub.assignee.id,
              issueGithub.assignee.login,
              issueGithub.assignee.node_id,
              issueGithub.assignee.type,
              issueGithub.assignee.avatar_url,
              issueGithub.assignee.url,
              user.name || '',
              user.location || '',
              user.email || '',
              user.bio || '',
              true
            )
            collaboratorId = col.id

            try {
              const col = await issueController.updateOrInsertIssue(
                issueGithub.id,
                repo.owner.login,
                repo.name,
                issueGithub.title,
                issueGithub.state,
                hours,
                last_comment,
                new Date(issueGithub.created_at),
                new Date(issueGithub.closed_at),
                new Date(issueGithub.updated_at),
                issueGithub.number,
                issueGithub.description,
                issueGithub.url,
                collaboratorId,
                undefined, //TODO Rikr2 Falta poner la relacion con el proyecto aqui
                repo.id,
                labels_ids,
                milestoneId
              )
            } catch (error) {
              console.log('==========error==========')
              console.log(issueGithub)
              console.log(hours)
              console.log(error)
              console.log('---------------------------')
            }
          } catch (error) {
            console.log('collaborator error')
            console.log(error)
            console.log(user)
          }
        })
      } else if (issueGithub.assignees.length > 0) {
        // TODO: Revisar que hacer cuando no tiene asignado a nadie pero si tiene varios colaboradores
        // Por el momento nos quedamos con el primero de ellos

        const coll = issueGithub.assignees[0]
        const collaborator = gh.getUser(coll.login)
        await collaborator.getProfile(async function (_err: string, user: UserProfile) {
          try {
            const col = await colController.updateOrInsertCollaborator(
              coll.id,
              coll.login,
              coll.node_id,
              coll.type,
              coll.avatar_url,
              coll.url,
              user.name || '',
              user.location || '',
              user.email || '',
              user.bio || '',
              true
            )
            collaboratorId = col.id

            try {
              const col = await issueController.updateOrInsertIssue(
                issueGithub.id,
                repo.owner.login,
                repo.name,
                issueGithub.title,
                issueGithub.state,
                hours,
                last_comment,
                new Date(issueGithub.created_at),
                new Date(issueGithub.closed_at),
                new Date(issueGithub.updated_at),
                issueGithub.number,
                issueGithub.description,
                issueGithub.url,
                collaboratorId,
                undefined, //TODO Rikr2 Falta poner la relacion con el proyecto aqui
                repo.id,
                labels_ids,
                milestoneId
              )
            } catch (error) {
              console.log('==========error==========')
              console.log(issueGithub)
              console.log(hours)
              console.log(error)
              console.log('---------------------------')
            }
          } catch (error) {
            console.log('collaborator error')
            console.log(error)
            console.log(user)
          }
        })
      }
    }
  }
}
