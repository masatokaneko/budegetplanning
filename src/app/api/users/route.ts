import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 仮のデータストア（後でデータベースに置き換え）
let users = [
  {
    id: '1',
    code: 'USR001',
    name: '管理者太郎',
    email: 'admin@example.com',
    department: '管理部',
    role: 'admin',
    isActive: true,
  },
  {
    id: '2',
    code: 'USR002',
    name: 'マネージャー花子',
    email: 'manager@example.com',
    department: '営業部',
    role: 'manager',
    isActive: true,
  },
]

// GET: ユーザー一覧の取得
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const role = searchParams.get('role')
  const department = searchParams.get('department')
  const isActive = searchParams.get('isActive')

  let filteredUsers = [...users]

  if (role) {
    filteredUsers = filteredUsers.filter(user => user.role === role)
  }

  if (department) {
    filteredUsers = filteredUsers.filter(user => user.department === department)
  }

  if (isActive !== null) {
    filteredUsers = filteredUsers.filter(user => user.isActive === (isActive === 'true'))
  }

  return NextResponse.json(filteredUsers)
}

// POST: 新規ユーザーの作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    if (!body.code || !body.name || !body.email || !body.department || !body.role) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    // コードの重複チェック
    if (users.some(user => user.code === body.code)) {
      return NextResponse.json(
        { error: 'このユーザーコードは既に使用されています' },
        { status: 400 }
      )
    }

    // メールアドレスの重複チェック
    if (users.some(user => user.email === body.email)) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に使用されています' },
        { status: 400 }
      )
    }

    const newUser = {
      id: String(users.length + 1),
      code: body.code,
      name: body.name,
      email: body.email,
      department: body.department,
      role: body.role,
      isActive: body.isActive ?? true,
    }

    users.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// PUT: ユーザーの更新
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    if (!body.id || !body.code || !body.name || !body.email || !body.department || !body.role) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    const index = users.findIndex(user => user.id === body.id)
    if (index === -1) {
      return NextResponse.json(
        { error: '指定されたユーザーが見つかりません' },
        { status: 404 }
      )
    }

    // コードの重複チェック（自身を除く）
    if (users.some(user => user.code === body.code && user.id !== body.id)) {
      return NextResponse.json(
        { error: 'このユーザーコードは既に使用されています' },
        { status: 400 }
      )
    }

    // メールアドレスの重複チェック（自身を除く）
    if (users.some(user => user.email === body.email && user.id !== body.id)) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に使用されています' },
        { status: 400 }
      )
    }

    users[index] = {
      ...users[index],
      code: body.code,
      name: body.name,
      email: body.email,
      department: body.department,
      role: body.role,
      isActive: body.isActive,
    }

    return NextResponse.json(users[index])
  } catch (error) {
    return NextResponse.json(
      { error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// DELETE: ユーザーの削除
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'IDが指定されていません' },
        { status: 400 }
      )
    }

    const index = users.findIndex(user => user.id === id)
    if (index === -1) {
      return NextResponse.json(
        { error: '指定されたユーザーが見つかりません' },
        { status: 404 }
      )
    }

    users = users.filter(user => user.id !== id)

    return NextResponse.json({ message: '削除が完了しました' })
  } catch (error) {
    return NextResponse.json(
      { error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
} 