"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Trash2, User } from "lucide-react"

interface Member {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  membershipType: string
  status: string
  startDate: string
  endDate?: string
}

export default function MemberDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [member, setMember] = useState<Member | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchMember = async () => {
      try {
        // In a real app, you would fetch from your API
        // For demo purposes, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock member data
        const mockMember = {
          _id: params.id as string,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "(555) 123-4567",
          membershipType: "Premium",
          status: "Active",
          startDate: "2023-01-15",
          endDate: "2024-01-15",
        }

        setMember(mockMember)
      } catch (error) {
        setError("Failed to load member details")
        console.error("Error fetching member:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMember()
  }, [params.id])

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this member?")) {
      try {
        // In a real app, you would call your API to delete the member
        await new Promise((resolve) => setTimeout(resolve, 1000))

        router.push("/members")
      } catch (error) {
        setError("Failed to delete member")
        console.error("Error deleting member:", error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading member details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <Link href="/members" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to Members
        </Link>
      </div>
    )
  }

  if (!member) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Member not found</p>
        <Link href="/members" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to Members
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/members" className="text-blue-500 hover:text-blue-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Member Details</h1>
        </div>

        <div className="flex gap-2">
          <Link href={`/members/${member._id}/edit`} className="btn-secondary flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Link>
          <button onClick={handleDelete} className="btn-danger flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 rounded-full p-8 mb-4">
              <User className="h-16 w-16 text-gray-500" />
            </div>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full 
              ${
                member.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : member.status === "Inactive"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {member.status}
            </span>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">
                    {member.firstName} {member.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{member.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{member.phone}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Membership Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Membership Type</p>
                  <p className="font-medium">{member.membershipType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{new Date(member.startDate).toLocaleDateString()}</p>
                </div>
                {member.endDate && (
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium">{new Date(member.endDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Membership History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(member.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Membership Started
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.membershipType} membership activated
                </td>
              </tr>
              {/* You would typically fetch this data from your API */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date("2023-02-15").toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Payment Received
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Monthly payment processed</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date("2023-03-10").toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Information Updated
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Contact information updated</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
